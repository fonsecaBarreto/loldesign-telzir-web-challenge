
export interface DestinyRegion {
  fare: number;
  region: RegionEntity;
}

export interface RegionEntity {
  cod: number;
  name: string;
  destinies: DestinyRegion[] 
}
