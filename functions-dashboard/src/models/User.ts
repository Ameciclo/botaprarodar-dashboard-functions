import { GenderTypes } from './GenderTypes';

export default interface User {
  name: string;
  age: string;
  income: string;
  communityId: string;
  telephone: string;
  status: boolean;
  gender: GenderTypes;
  profilePicture: string;
  id: string;
  address: string;
  docNumber: bigint;
  isBlocked: boolean;
  racial: string;
  schooling: string;
  schoolingStatus: string;
  userQuiz: {
    alreadyUseBPR: boolean;
  };
}

export const mapUsersData = (data: any) => {
  return Object.keys(data).map(id => {
    return { id, ...data[id] };
  });
};
