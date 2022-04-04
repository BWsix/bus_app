import {
  Divider,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { MyAppShell } from "src/components/MyAppShell";
import { MyLoader } from "src/components/MyLoader";
import { RouteButton } from "src/components/RouteButton";
import { usePreviousRoute } from "src/hooks/usePreviousRoute";
import { useRoutesQuery } from "src/hooks/useRoutesQuery";

let loaded = false;
const BusHome: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const { data, fetching, error } = useRoutesQuery();
  const { previousRoute, setPreviousRoute } = usePreviousRoute();

  useEffect(() => {
    loaded = true;
  }, []);
  if (!loaded) return <></>;

  if (error) {
    return (
      <Text color="red" my="md">
        Error : {error.message}
      </Text>
    );
  }

  return (
    <MyAppShell>
      <Navbar sx={{ border: "0" }}>
        {!!previousRoute && (
          <Navbar.Section my="sm">
            <Text size="sm" color="dimmed" mb="xs">
              上次查看
            </Text>

            <RouteButton
              routeId={previousRoute.id}
              description={previousRoute.description}
              name={previousRoute.name}
              isForward={previousRoute.isForward}
              setPreviousRoute={setPreviousRoute}
            />
          </Navbar.Section>
        )}

        <Navbar.Section>
          <TextInput
            placeholder="703"
            label="搜尋路線"
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
          />
        </Navbar.Section>

        <Divider my="sm" />

        <Navbar.Section grow component={ScrollArea} mb="md">
          {fetching ? (
            <MyLoader />
          ) : (
            <Stack spacing="xs">
              {data?.routes.edges
                .filter(({ node: { name, description } }) => {
                  const query = input.toUpperCase();

                  return name.includes(query) || description.includes(query);
                })
                .map(({ node: { id, description, name } }) => (
                  <RouteButton
                    key={id}
                    routeId={id}
                    description={description}
                    name={name}
                    setPreviousRoute={setPreviousRoute}
                  />
                ))}
            </Stack>
          )}
        </Navbar.Section>
      </Navbar>
    </MyAppShell>
  );
};

export default BusHome;
