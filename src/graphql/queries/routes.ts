import { gql } from "urql";

export const routesQuery = gql`
  query QUERY_ROUTES($lang: String!) {
    routes(lang: $lang) {
      edges {
        node {
          id
          seq
          name
          opType
          routeGroup
          description
          providers {
            edges {
              node {
                id
                name
                telephone
                url
              }
            }
          }
        }
      }
    }
  }
`;

// export interface SingleRoute extends SingleRouteFromRoutes {
//   opType: OpType;
//   routeGroup: string;
//   providers: EdgesData<SingleProvider>
// }
// export interface QueriedRoutes {
//   routes: EdgesData<SingleRoute>;
// }
