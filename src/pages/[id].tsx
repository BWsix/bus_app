import {
  ActionIcon,
  Center,
  Group,
  Navbar,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { ErrorMessage } from "src/components/ErrorMessage";
import { GoToHomePageButton } from "src/components/GoToHomePageButton";
import { MyAppShell } from "src/components/MyAppShell";
import { MyLoader } from "src/components/MyLoader";
import { StationTag } from "src/components/StationTag";
import { useBusQuery } from "src/hooks/useBusQuery";
import { usePreviousRoute } from "src/hooks/usePreviousRoute";
import { Refresh, SwitchHorizontal } from "tabler-icons-react";

let loaded = false;
const Bus: NextPage = () => {
  const router = useRouter();
  const routeId = parseInt(router.query.id as string, 10);
  const _isForward = router.query.isForward !== "false";

  const [isForward, isForwardHandler] = useDisclosure(_isForward);
  const { previousRoute, setPreviousRoute } = usePreviousRoute();
  const { data, error, fetching, reexecuteQuery } = useBusQuery(
    routeId,
    isForward
  );
  const viewport = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    loaded = true;
  }, []);
  if (!loaded) return <></>;

  const scrollToTop = () =>
    viewport.current.scrollTo({ top: 0, behavior: "smooth" });
  const handleSwitch = () => {
    isForwardHandler.toggle();
    scrollToTop();
    setPreviousRoute({ ...previousRoute, isForward: !isForward });
    router.push(
      `/${routeId}?isForward=${isForward ? "false" : "true"}`,
      undefined,
      { shallow: true }
    );
  };

  const rows = data.routes?.map(({ name, status, busFlag }, idx) => (
    <StationTag key={idx} status={status} busFlag={busFlag} name={name} />
  ));

  return (
    <MyAppShell>
      <Navbar pb="sm" sx={{ border: "0" }}>
        <Navbar.Section my="sm">
          <GoToHomePageButton />
        </Navbar.Section>

        {fetching || !routeId ? (
          <MyLoader />
        ) : error ? (
          <ErrorMessage>{error.message}</ErrorMessage>
        ) : !data.meta || !data.routes ? (
          <ErrorMessage>找不到路線</ErrorMessage>
        ) : (
          <>
            <Navbar.Section my="md">
              <Center>
                <Group>
                  <Title order={3} align="center">
                    {data.meta[isForward ? "departure" : "destination"]}
                  </Title>

                  <Title order={3} align="center">
                    往
                  </Title>

                  <Title order={3} align="center">
                    {data.meta[isForward ? "destination" : "departure"]}
                  </Title>

                  <Group>
                    <ActionIcon onClick={handleSwitch}>
                      <SwitchHorizontal />
                    </ActionIcon>

                    <ActionIcon
                      onClick={() => {
                        console.log("fuck");
                        reexecuteQuery({ requestPolicy: "network-only" });
                      }}
                    >
                      <Refresh />
                    </ActionIcon>
                  </Group>
                </Group>
              </Center>
            </Navbar.Section>

            <Navbar.Section grow component={ScrollArea} viewportRef={viewport}>
              {rows}
            </Navbar.Section>
          </>
        )}
      </Navbar>
    </MyAppShell>
  );
};

export default Bus;
