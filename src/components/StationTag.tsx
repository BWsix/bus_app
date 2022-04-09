import { Box, Text } from "@mantine/core";

interface Props {
  name: string;
  busFlag: boolean;
  status: string;
}

export const StationTag: React.FC<Props> = ({ name, busFlag, status }) => {
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
      <Text>{status}</Text>
    </Box>
  );
};
