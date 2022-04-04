import { Container, Header, Title } from "@mantine/core";

export const MyHeader = () => {
  return (
    <Header height={60}>
      <Container size="xs" py="md" px="xs">
        <Title order={3} py="auto">
          桃園公車Lite
        </Title>
      </Container>
    </Header>
  );
};
