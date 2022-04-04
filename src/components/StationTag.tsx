import { Box, Text } from "@mantine/core";

interface Props {
  name: string;
  arrivesIn: number | undefined;
  arrivalTime: string;
  busFlag: boolean;
  isSuspended: boolean;
}

export const StationTag: React.FC<Props> = ({
  name,
  arrivesIn,
  arrivalTime,
  busFlag,
  isSuspended,
}) => {
  return (
    <Box
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        backgroundColor: busFlag
          ? theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0]
          : undefined,
      })}
    >
      <Text>{name}</Text>
      <Text>
        {isSuspended
          ? "末班已過"
          : arrivesIn === undefined
          ? arrivalTime
          : arrivesIn === 0
          ? "即將抵達"
          : `${arrivesIn} 分鐘後抵達`}
      </Text>
    </Box>
  );
};
