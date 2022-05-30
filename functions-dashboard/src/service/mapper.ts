import dayjs from 'dayjs';
import Bike from '../models/Bike';
import Travel from '../models/Travel';
import ChartDataProps from '../models/ChartDataProps';
import Community from '../models/Community';
import DashboardInfo from '../models/DashboardInfo';
import { GenderTypes } from '../models/GenderTypes';
import UserNew from '../models/UserNew';
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
  usersData: UserNew[],
  travelData: Travel[],
): DashboardInfo => {
  const dashboardInfo: DashboardInfo = DashboardInfoInitialValues;

  dashboardInfo.usersQuantity = usersData.length;
  dashboardInfo.communitiesQuantity = communitiesData.length;
  dashboardInfo.bikesQuantity = bikesData.length;

  dashboardInfo.destination = getDestinations(travelData);
  dashboardInfo.bikesInUse = getBikesInUseQuantity(bikesData);//ok
  dashboardInfo.newUsers = getNewUsers(usersData); //ok
  dashboardInfo.womenUsers = getWomenUsers(usersData);//ok
  dashboardInfo.travelsWithRideGiven = getTravelsWithRideGiven(travelData);
  dashboardInfo.incidentsHappened = getIncidentsHappened(travelData);//ok
  dashboardInfo.travelsDone = getTravelsDone(travelData); //ok
  dashboardInfo.withdrawalsReason = getWithdrawalsReason(travelData);
  dashboardInfo.racialInfo = getRacialInfo(usersData);//ok
  dashboardInfo.gender = getGenderInfo(usersData);//ok
  dashboardInfo.schooling = getSchoolingInfo(usersData);//ok
  dashboardInfo.age = getAgeInfo(usersData);//ok
  dashboardInfo.income = getIncomeInfo(usersData);//ok
  dashboardInfo.travelTimeInMinutes = getTimeInMinutesFromTravel(travelData);

  return dashboardInfo;
};

export function getTravelsDone(travels: Travel[]): number { //ok
  
  if(!travels) return 0;

  let count = 0;
  travels.forEach(travel => {
    if (travel.finished_at?.length > 0) {
      count++;
    }
  });

  return count;
}

export function getIncidentsHappened(travels: Travel[]): number { //ok
  let incidents = 0;

  if(!travels) return 0;

  travels.forEach(travel => {
        incidents += travel.problemsDuringRiding === 'Sim' ? 1 : 0;
  });
  return incidents;
}

export function getWithdrawalsReason(travels: Travel[]): ChartDataProps[] { //ok
  const withdrawalsReason: string[] = [];

  travels.forEach(travel => {
    if(travel.reason)
      withdrawalsReason.push(travel.reason);
  });
  return groupArrayToChartDataProps(withdrawalsReason);
}

export function getDestinations(travels: Travel[]): ChartDataProps[] { //ok
  const allDestinations: string[] = [];
  travels.forEach(travel => {
      allDestinations.push(
        StringUtils.capitalizeString(travel.destination)
      );
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

export function getBikesInUseQuantity(bikeArray: Bike[]): number { //ok
  return bikeArray.filter(bike => bike.inUse).length;
}

export function getNewUsers(users: UserNew[]): number { //ok
  return users.filter(user => user.userQuiz?.alreadyUseBPR).length;
}

export function getWomenUsers(users: UserNew[]): number {//ok
  const femininGender: GenderTypes = 'Feminino';
  return users.filter(user => user.gender === femininGender).length;
}

export function getTravelsWithRideGiven(travels: Travel[]): number { //ok
  return travels.filter(travel => travel.giveRide === 'Sim').length;
}

export function getRacialInfo(users: UserNew[]): ChartDataProps[] { //ok
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

export function getGenderInfo(users: UserNew[]): ChartDataProps[] { //ok
  const genderArray: GenderTypes[] = users.map(user => {
    return user.gender;
  });
  return groupArrayToChartDataProps(genderArray);
}

export function getSchoolingInfo(users: UserNew[]): ChartDataProps[] { //ok
  const schoolingArray = users.map(user => {
    return StringUtils.normalizeSchoolingInfo(
      user.schooling,
      user.schoolingStatus,
    );
  });
  return groupArrayToChartDataProps(schoolingArray);
}

export function getAgeInfo(users: UserNew[]): ChartDataProps[] { //ok
  const result: string[] = [];
  users.forEach(user => {
    result.push(StringUtils.normalizeAgeInfo(user.age));
  });
  return groupArrayToChartDataProps(result);
}

export function getIncomeInfo(users: UserNew[]): ChartDataProps[] { //ok
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

export function getTimeInMinutesFromTravel(travels: Travel[]): number[] {
  const times: number[] = [];
  travels.forEach(travel =>{
    times.push(
      StringUtils.intervalInMinutesBetweenDates(
        travel.initiated_at,
        travel.finished_at
      )
    );
  });

  return times;
}


const Mapper = {
  mapResultToData,
};

export default Mapper;
