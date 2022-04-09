import { request } from "graphql-request";
import type { NextApiHandler } from "next";
import { busQuery } from "src/graphql/queries/bus";
import { BusQueryResult } from "src/graphql/queries/bus.typedef";
import { parseRouteData } from "src/urils/parseRouteData";

const handler: NextApiHandler = async (req, res) => {
  request<BusQueryResult>({
    url: "https://ebus.tycg.gov.tw/ebus/graphql",
    document: busQuery,
    variables: { lang: "zh", routeId: 703 },
  }).then((_data) => {
    const data = parseRouteData(_data, true);

    res.json(
      data?.map(({ name, status }) => ({
        name,
        status,
      }))
    );
  });
};

export default handler;
