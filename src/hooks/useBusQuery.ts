import { useInterval } from "@mantine/hooks";
import { useEffect } from "react";
import { busQuery } from "src/graphql/queries/bus";
import type { BusQueryResult } from "src/graphql/queries/bus.typedef";
import { parseRouteData } from "src/urils/parseRouteData";
import { useQuery } from "urql";

export const useBusQuery = (
  routeId: number,
  isForward: boolean,
  refetchIntervalInSecond = 15
) => {
  const [{ fetching, data: _data, error }, reexecuteQuery] =
    useQuery<BusQueryResult>({
      query: busQuery,
      variables: { lang: "zh", routeId },
      pause: !routeId,
    });

  const refetchInterval = useInterval(
    reexecuteQuery,
    1000 * refetchIntervalInSecond
  );

  useEffect(() => {
    refetchInterval.start();

    return refetchInterval.stop;
  }, []);

  const data = parseRouteData(_data, isForward);

  return {
    fetching,
    error,
    data: { routes: data, meta: _data?.route },
    reexecuteQuery,
  };
};
