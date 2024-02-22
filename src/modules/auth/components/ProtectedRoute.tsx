import { Box, Center } from "@mantine/core";
import { Player } from "@lottiefiles/react-lottie-player";

import { useUser } from "../hooks/useUser";
import { PropsWithChildren } from "react";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { loading } = useUser();
  return (
    <Box pos="relative">
      {loading && (
        <Center h="100vh" style={{ position: "absolute", inset: 0 }}>
          <Player
            autoplay
            src="https://assets4.lottiefiles.com/packages/lf20_eb5cde4g.json"
            style={{ height: 240, width: 240 }}
          ></Player>
        </Center>
      )}
      {!loading && <div>{children}</div>}
    </Box>
  );
}
