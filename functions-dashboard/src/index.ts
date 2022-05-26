import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Bike, { mapBikesData } from './models/Bike';
import Community, { mapCommunitiesData } from './models/Community';
import User, { mapUsersData } from './models/User';
import Mapper from './service/mapper';

admin.initializeApp(functions.config().firebase);
const database = admin.database().ref();
const bikesDatabase = admin.database().ref('bikes');
const communitiesDatabase = admin.database().ref('communities');
const usersDatabase = admin.database().ref('users');

exports.dashboardInfoFunction = functions.pubsub
  // .schedule('00 * * * *') ==> At every hour
  .schedule('00 00 * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async context => {
    const bikesData: Bike[] = mapBikesData(
      (await bikesDatabase.once('value')).toJSON(),
    );
    const communitiesData: Community[] = mapCommunitiesData(
      (await communitiesDatabase.once('value')).toJSON(),
    );
    const usersData: User[] = mapUsersData(
      (await usersDatabase.once('value')).toJSON(),
    );
    const dashboardInfo = Mapper.mapResultToData(
      communitiesData,
      bikesData,
      usersData,
    );

    database.update({
      dashboardInfo,
    });

    return null;
  });
