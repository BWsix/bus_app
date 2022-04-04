import { Container } from "@mantine/core";
import { MyHeader } from "./MyHeader";

export const MyAppShell: React.FC = ({ children }) => {
  return (
    <>
      <MyHeader />

      <Container size="xs" px="xs">
        {children}
      </Container>
    </>
  );
};
