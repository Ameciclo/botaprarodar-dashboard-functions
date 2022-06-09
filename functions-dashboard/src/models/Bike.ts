
export default interface Bike {
  id: string;
  available: boolean;
  communityId: string;
  createdDate: string;
  inUse: boolean;
  name: string;
  orderNumber: number;
  path: string;
  photoPath: string;
  photoThumbnailPath: string;
  serialNumber: string;
  withdrawToUser: string;
}

export const mapBikesData = (bikesData: any): Bike[] => {
  const data: Bike[] = Object.keys(bikesData).map((id) => {
    const bike = bikesData[id];
    return { id, ...bike };
  });
  return data;
};