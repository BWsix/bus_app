import { useLocalStorage } from "@mantine/hooks";
import type { RouteType } from "src/types";

export const usePreviousRoute = () => {
  const [previousRoute, setPreviousRoute] = useLocalStorage<RouteType>({
    key: "bus-previous-route",
  });

  return { previousRoute, setPreviousRoute };
};
