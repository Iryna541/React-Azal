import { Box, Center } from "@mantine/core";
import { Player } from "@lottiefiles/react-lottie-player";

import { useUser } from "../hooks/useUser";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PublicRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  console.log(user, loading);
  useEffect(() => {
    if (user) {
      navigate("/askq");
    }
    // eslint-disable-next-line
  }, [user]);
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
