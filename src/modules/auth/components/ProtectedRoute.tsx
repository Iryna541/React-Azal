import { Box, Center, Flex, Loader } from "@mantine/core";
import { AppLogo } from "~/assets/AppLogo";
import { useUser } from "../hooks/useUser";
import { PropsWithChildren } from "react";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { loading } = useUser();
  return (
    <Box pos="relative">
      {loading && (
        <Center h="100vh" style={{ position: "absolute", inset: 0 }}>
          <Flex direction="column" justify="center" align="center">
            <AppLogo width={64} height={64} />
            <Loader mt="xl" size="lg" />
          </Flex>
        </Center>
      )}
      {!loading && <div>{children}</div>}
    </Box>
  );
}
