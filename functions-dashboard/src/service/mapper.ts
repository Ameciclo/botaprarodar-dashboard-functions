import dayjs from 'dayjs';
import Bike from '../models/Bike';
import ChartDataProps from '../models/ChartDataProps';
import Community from '../models/Community';
import DashboardInfo from '../models/DashboardInfo';
import { GenderTypes } from '../models/GenderTypes';
import User from '../models/User';
import StringUtils from '../utils/StringUtils';

const DashboardInfoInitialValues: DashboardInfo = {
  usersQuantity: 0,
  newUsers: 0,
  womenUsers: 0,
  communitiesQuantity: 0,
  bikesQuantity: 0,
  bikesInUse: 0,
  bikesPerCommunities: [],
  withdrawalsPerCommunities: [],
  travelsDone: 0,
  travelsWithRideGiven: 0,
  incidentsHappened: 0,
  withdrawalsReason: [],
  bikersCommunities: [],
  destination: [],
  racialInfo: [],
  gender: [],
  schooling: [],
  income: [],
  age: [],
  travelTimeInMinutes: [],
  lastUpdate: dayjs().toDate(),
};

const mapResultToData = (
  communitiesData: Community[],
  bikesData: Bike[],
  usersData: User[],
): DashboardInfo => {
  const dashboardInfo: DashboardInfo = DashboardInfoInitialValues;

  dashboardInfo.usersQuantity = usersData.length;
  dashboardInfo.communitiesQuantity = communitiesData.length;
  dashboardInfo.bikesQuantity = bikesData.length;

  dashboardInfo.destination = getDestinations(bikesData);
  dashboardInfo.bikesInUse = getBikesInUseQuantity(bikesData);
  dashboardInfo.newUsers = getNewUsers(usersData);
  dashboardInfo.womenUsers = getWomenUsers(usersData);
  dashboardInfo.travelsWithRideGiven = getTravelsWithRideGiven(bikesData);
  dashboardInfo.incidentsHappened = getIncidentsHappened(bikesData);
  dashboardInfo.travelsDone = getTravelsDone(bikesData);
  dashboardInfo.withdrawalsReason = getWithdrawalsReason(bikesData);
  dashboardInfo.racialInfo = getRacialInfo(usersData);
  dashboardInfo.gender = getGenderInfo(usersData);
  dashboardInfo.schooling = getSchoolingInfo(usersData);
  dashboardInfo.age = getAgeInfo(usersData);
  dashboardInfo.income = getIncomeInfo(usersData);
  dashboardInfo.travelTimeInMinutes = getTimeInMinutesFromTravel(bikesData);

  return dashboardInfo;
};

function getTravelsDone(bikesData: Bike[]): number {
  let travelsDone = 0;
  bikesData.forEach(bike => {
    if (bike.devolutions?.length > 0) {
      travelsDone += bike.devolutions?.length;
    }
  });
  return travelsDone;
}

function getIncidentsHappened(bikesData: Bike[]): number {
  let incidents = 0;
  bikesData.forEach(bike => {
    if (bike.devolutions && bike.devolutions.length > 0) {
      bike.devolutions.forEach(devolution => {
        incidents += devolution.quiz.problemsDuringRiding === 'Sim' ? 1 : 0;
      });
    }
  });
  return incidents;
}

function getWithdrawalsReason(bikesData: Bike[]): ChartDataProps[] {
  const withdrawalsReason: string[] = [];
  bikesData.forEach(bike =>
    bike.devolutions?.forEach(devolution =>
      withdrawalsReason.push(devolution.quiz.reason),
    ),
  );
  return groupArrayToChartDataProps(withdrawalsReason);
}

function getDestinations(bikeArray: Bike[]): ChartDataProps[] {
  const allDestinations: string[] = [];
  bikeArray.forEach(bike => {
    bike.devolutions?.forEach(devolution => {
      allDestinations.push(
        StringUtils.capitalizeString(devolution.quiz.destination),
      );
    });
  });
  return groupArrayToChartDataProps(allDestinations)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);
}

function groupArrayToChartDataProps(allItems: string[]): ChartDataProps[] {
  const mapGrouped = new Map();
  const chartDataProps: ChartDataProps[] = [];
  allItems.forEach(item => {
    const collection = mapGrouped.get(item);
    if (!collection) {
      mapGrouped.set(item, [1]);
    } else {
      collection.push(1);
    }
  });
  mapGrouped.forEach((value, key) => {
    chartDataProps.push({
      label: key,
      quantity: value.length,
    });
  });
  return chartDataProps.sort((a, b) => b.quantity - a.quantity);
}

function getBikesInUseQuantity(bikeArray: Bike[]): number {
  return bikeArray.filter(bike => bike.inUse).length;
}

function getNewUsers(users: User[]): number {
  return users.filter(user => user.userQuiz?.alreadyUseBPR).length;
}

function getWomenUsers(users: User[]): number {
  const femininGender: GenderTypes = 'Feminino';
  return users.filter(user => user.gender === femininGender).length;
}

function getTravelsWithRideGiven(bikes: Bike[]): number {
  return bikes.filter(bike =>
    bike.devolutions?.filter(devolution => devolution.quiz?.giveRide),
  ).length;
}

function getRacialInfo(users: User[]): ChartDataProps[] {
  const result = [] as string[];

  users.forEach(user => {
    let racial: string;
    if (user.racial) {
      racial = StringUtils.normalizeRacialInfo(user.racial);
    } else {
      racial = StringUtils.normalizeRacialInfo('não informado');
    }
    result.push(racial);
  });

  return groupArrayToChartDataProps(result);
}

function getGenderInfo(users: User[]): ChartDataProps[] {
  const genderArray: GenderTypes[] = users.map(user => {
    return user.gender;
  });
  return groupArrayToChartDataProps(genderArray);
}

function getSchoolingInfo(users: User[]): ChartDataProps[] {
  const schoolingArray = users.map(user => {
    return StringUtils.normalizeSchoolingInfo(
      user.schooling,
      user.schoolingStatus,
    );
  });
  return groupArrayToChartDataProps(schoolingArray);
}

function getAgeInfo(users: User[]): ChartDataProps[] {
  const result: string[] = [];
  users.forEach(user => {
    result.push(StringUtils.normalizeAgeInfo(user));
  });
  return groupArrayToChartDataProps(result);
}

function getIncomeInfo(users: User[]): ChartDataProps[] {
  const result = users
    .map(item => item?.income)
    .map(item => {
      const array = String(item).split('.');
      if (array.length >= 2) {
        if (array[1].length > 2) {
          return StringUtils.normalizeIncomeInfo(array.join(''));
        }
      }
      return StringUtils.normalizeIncomeInfo(array[0]);
    });

  return groupArrayToChartDataProps(result);
}

function getTimeInMinutesFromTravel(bikes: Bike[]): number[] {
  interface TravelTime {
    withdrawTime?: string;
    devolutionTime: string;
    interval: number;
  }

  const allTravelsTime: TravelTime[] = [];

  bikes.forEach(bike => {
    bike.devolutions?.forEach(devolution => {
      const withdrawFromDevolution = bike.withdraws?.find(
        withdraw => withdraw.id === devolution.withdrawId,
      );
      if (withdrawFromDevolution) {
        allTravelsTime.push({
          withdrawTime: withdrawFromDevolution?.date,
          devolutionTime: devolution.date,
          interval: StringUtils.intervalInMinutesBetweenDates(
            withdrawFromDevolution?.date,
            devolution.date,
          ),
        });
      }
    });
  });
  return allTravelsTime.map(travelTime => {
    return travelTime.interval;
  });
}

const Mapper = {
  mapResultToData,
};

export default Mapper;
