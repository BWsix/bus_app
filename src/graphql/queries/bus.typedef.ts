export interface BusQueryResult {
  route: Route;
}

export interface Route {
  __typename: string;
  id: string;
  departure: string;
  destination: string;
  buses: Buses;
  estimateTimes: EstimateTimes;
  stations: Stations;
}

export interface Buses {
  __typename: string;
  edges: BusesEdge[];
}

export interface BusesEdge {
  __typename: string;
  node: PurpleNode;
}

export interface PurpleNode {
  __typename: string;
  id: string;
  type: string;
}

export interface EstimateTimes {
  __typename: string;
  edges: EstimateTimesEdge[];
}

export interface EstimateTimesEdge {
  __typename: PurpleTypename;
  node: FluffyNode;
}

export enum PurpleTypename {
  EstimateTimeEdge = "EstimateTimeEdge",
}

export interface FluffyNode {
  __typename: FluffyTypename;
  id: string;
  goBack: number;
  comeTime: string;
  isSuspended: boolean;
  isConstruction: boolean;
  isEvent: boolean;
  isOperationDay: boolean;
  etas: Eta[];
}

export enum FluffyTypename {
  EstimateTime = "EstimateTime",
}

export interface Eta {
  __typename: EtaTypename;
  busId: string;
  etaTime: number;
  isLast: boolean;
}

export enum EtaTypename {
  Eta = "ETA",
}

export interface Stations {
  __typename: string;
  edges: StationsEdge[];
}

export interface StationsEdge {
  __typename: TentacledTypename;
  node: TentacledNode;
}

export enum TentacledTypename {
  RouteStationEdge = "RouteStationEdge",
}

export interface TentacledNode {
  __typename: StickyTypename;
  id: string;
  name: string;
}

export enum StickyTypename {
  Station = "Station",
}
