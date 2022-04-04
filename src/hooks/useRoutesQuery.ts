import { routesQuery } from "src/graphql/queries/routes";
import type { RoutesQueryResult } from "src/graphql/queries/routes.typedef";
import { useQuery } from "urql";

export const useRoutesQuery = () => {
  const [{ data, fetching, error }] = useQuery<RoutesQueryResult>({
    query: routesQuery,
    variables: { lang: "zh" },
  });

  return { data, fetching, error };
};
