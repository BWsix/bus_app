import { Text } from "@mantine/core";

export const ErrorMessage: React.FC = ({ children }) => {
  return (
    <Text color="red" mt="md">
      {children}
    </Text>
  );
};
