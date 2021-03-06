import type { BusQueryResult } from "src/graphql/queries/bus.typedef";

export const parseRouteData = (
  _data: BusQueryResult | undefined,
  isForward: boolean
) => {
  const stationNameMapper = new Map(
    _data?.route.stations.edges.map(({ node: { id, name } }) => [id, name])
  );

  let prevEtaTime = 69420;
  const data = _data?.route.estimateTimes.edges
    .filter(({ node: { goBack } }) => goBack === (isForward ? 1 : 2))
    .map(({ node }) => ({
      ...node,
      stationName: stationNameMapper.get(node.id),
    }))
    .map(({ etas: [bus, ...restBuses], ...restProps }) => {
      let busFlag = false;

      if (bus?.etaTime !== undefined) {
        if (bus.etaTime < prevEtaTime) {
          prevEtaTime = bus.etaTime;
          busFlag = true;
        }
      } else {
        prevEtaTime = 69420;
      }

      return {
        ...restProps,
        etas: [bus, ...restBuses],
        busFlag,
      };
    })
    .map(
      ({
        id,
        stationName,
        comeTime,
        isSuspended,
        busFlag,
        etas: [bus, ..._],
      }) => {
        const arrivesIn = bus?.etaTime;
        const arrivalTime = comeTime;

        const status = isSuspended
          ? "末班已過"
          : arrivesIn === undefined
          ? arrivalTime
          : arrivesIn === 0
          ? "即將抵達"
          : `${arrivesIn} 分鐘後抵達`;

        return {
          id,
          status,
          busFlag,
          name: stationName || "",
        };
      }
    );

  return data;
};
