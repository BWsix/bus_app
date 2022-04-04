import { gql } from "urql";

export const busQuery = gql`
  query QUERY_ESTIMATE_TIMES($routeId: Int!, $lang: String!) {
    route(xno: $routeId, lang: $lang) {
      id
      departure
      destination
      buses {
        ...busesInEstimateTimeFragment
        __typename
      }
      estimateTimes {
        ...estimateTimesFragment
        __typename
      }
      stations {
        ...routeStationsFragment
        __typename
      }
      __typename
    }
  }

  fragment busesInEstimateTimeFragment on RouteBusConnection {
    edges {
      node {
        id
        type
        __typename
      }
      __typename
    }
    __typename
  }

  fragment routeStationsFragment on RouteStationConnection {
    edges {
      node {
        id
        name
        __typename
      }
      __typename
    }
    __typename
  }

  fragment estimateTimesFragment on EstimateTimeConnection {
    edges {
      node {
        id
        goBack
        comeTime
        isSuspended
        isConstruction
        isEvent
        isOperationDay
        etas {
          busId
          etaTime
          isLast
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
`;
