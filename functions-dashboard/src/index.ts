import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Bike, { mapBikesData } from './models/Bike';
import Community, { mapCommunitiesData } from './models/Community';
import User, { mapUsersData } from './models/User';
import Travel, { mapTravelsData } from './models/Travel';
import Mapper from './service/mapper';
import serviceAccount from './config/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert((<any>serviceAccount).credential),
  databaseURL: (<any>serviceAccount).databaseURL
});

const database = admin.database().ref();
const bikesDatabase = admin.database().ref('bikes');
const communitiesDatabase = admin.database().ref('communities');
const usersDatabase = admin.database().ref('users');
const travelDatabase = admin.database().ref('travels');

exports.dashboardInfoFunction = functions.pubsub
  // .schedule('00 * * * *') ==> At every hour
  .schedule('every 60 minutes')
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
    const travelData: Travel[] = mapTravelsData(
      (await travelDatabase.once('value')).toJSON(),
    );
    const dashboardInfo = Mapper.mapResultToData(
      communitiesData,
      bikesData,
      usersData,
      travelData,
    );

    database.update({
      dashboardInfo,
    });

    return null;
  });
