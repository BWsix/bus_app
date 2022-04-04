export interface RoutesQueryResult {
  routes: Routes;
}

export interface Routes {
  __typename: string;
  edges: RoutesEdge[];
}

export interface RoutesEdge {
  __typename: PurpleTypename;
  node: PurpleNode;
}

export enum PurpleTypename {
  RouteEdge = "RouteEdge",
}

export interface PurpleNode {
  __typename: FluffyTypename;
  id: string;
  seq: number;
  name: string;
  opType: number;
  routeGroup: RouteGroup;
  description: string;
  providers: Providers;
}

export enum FluffyTypename {
  RouteItem = "RouteItem",
}

export interface Providers {
  __typename: ProvidersTypename;
  edges: ProvidersEdge[];
}

export enum ProvidersTypename {
  ProviderConnection = "ProviderConnection",
}

export interface ProvidersEdge {
  __typename: TentacledTypename;
  node: FluffyNode;
}

export enum TentacledTypename {
  ProviderEdge = "ProviderEdge",
}

export interface FluffyNode {
  __typename: StickyTypename;
  id: string;
  name: string;
  telephone: string;
  url: string;
}

export enum StickyTypename {
  Provider = "Provider",
}

export enum RouteGroup {
  Empty = "",
  F901 = "F901",
  F902 = "F902",
  F903 = "F903",
  F905 = "F905",
  F907 = "F907",
  中壢 = "中壢",
  先導公車 = "先導公車",
  八德 = "八德",
  公總路線 = "公總路線",
  大園 = "大園",
  大溪 = "大溪",
  市區公車 = "市區公車",
  平鎮 = "平鎮",
  新屋 = "新屋",
  桃園 = "桃園",
  楊梅 = "楊梅",
  蘆竹 = "蘆竹",
  觀音 = "觀音",
  龍潭 = "龍潭",
  龜山 = "龜山",
}
