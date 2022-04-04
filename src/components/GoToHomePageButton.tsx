import { Button } from "@mantine/core";
import { useRouter } from "next/router";

export const GoToHomePageButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/");
      }}
    >
      回前頁
    </Button>
  );
};
