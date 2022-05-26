import Bicycle from './Bicycle';
import Withdrawal from './Withdrawal';

export default interface Community {
  id: string;
  address: string;
  created_date: Date;
  description: string;
  name: string;
  org_email: string;
  org_name: string;
  bicycles: Bicycle[];
  withdrawals: Withdrawal[];
}

export const mapCommunitiesData = (data: any) => {
  return Object.keys(data).map(id => {
    return { id, ...data[id] };
  });
};
