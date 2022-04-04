import { Text, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";
import { RouteType } from "src/types";

interface Props {
  name: string;
  description: string;
  routeId: string;
  isForward?: boolean;
  setPreviousRoute: (
    val: RouteType | ((prevState: RouteType) => RouteType)
  ) => void;
}

export const RouteButton: React.FC<Props> = ({
  description,
  name,
  routeId,
  isForward,
  setPreviousRoute,
}) => {
  const router = useRouter();

  return (
    <UnstyledButton
      onClick={() => {
        const _isForward = isForward !== undefined ? isForward : true;

        setPreviousRoute({
          id: routeId,
          name,
          description,
          isForward: _isForward,
        });

        router.push(`/${routeId}?isForward=${_isForward}`);
      }}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Text size="sm">{name}</Text>
      <Text size="xs" color="dimmed">
        {description}
      </Text>
    </UnstyledButton>
  );
};
