import Bike from './Bike';
import ChartDataProps from './ChartDataProps';

export interface BikesPerCommunities extends ChartDataProps {
  label: string;
  quantity: number;
  bikes: Bike[];
}
