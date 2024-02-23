import { IconAt, IconLock } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  Anchor,
  Box,
  Button,
  Center,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AppLogo } from "~/assets/AppLogo";
import { useLogin } from "~/modules/auth/api/useLogin";
import { storage } from "~/lib/storage";
import { showSuccessNotification } from "~/utils/notifications";

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().trim().min(8, "Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useLogin({
    config: {
      onSuccess: (res) => {
        storage.setToken({ accessToken: res.user.access_token });
        showSuccessNotification("Successfully Logged In!");
        if (res.user.isSuperAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      },
    },
  });

  const form = useForm<LoginSchema>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginSchema),
  });

  return (
    <Box p="md" mah="100vh" bg="hsl(var(--accent) / 0.025)">
      <Center mt="md" mih="100vh">
        <Box
          p="xl"
          style={{
            maxWidth: "400px",
            flexGrow: 1,
            background: "white",
            border: "1px solid hsl(var(--border))",
            boxShadow: "var(--mantine-shadow-sm)",
            borderRadius: 8,
          }}
        >
          <Stack>
            <Stack gap={0} align="center">
              <AppLogo height={48} width={48} />
              <Title order={2} mb="4px">
                Azalio
              </Title>
            </Stack>
            <form
              onSubmit={form.onSubmit((values) => {
                handleLogin(values);
              })}
            >
              <Stack>
                <TextInput
                  label="Email"
                  name="az-email"
                  placeholder="Enter your Email"
                  leftSection={<IconAt size={16} />}
                  withAsterisk
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  label="Password"
                  name="az-password"
                  leftSection={<IconLock size={16} />}
                  placeholder="Enter your password"
                  withAsterisk
                  {...form.getInputProps("password")}
                />

                <Text ta="right">
                  <Anchor
                    size="sm"
                    underline="always"
                    style={{
                      color: "hsl(var(--primary))",
                      textUnderlineOffset: 2,
                    }}
                    component={Link}
                    to="/auth/sign-up"
                  >
                    Forgot Password?
                  </Anchor>
                </Text>

                <Button
                  mt="sm"
                  size="md"
                  type="submit"
                  variant="azalio-ui-dark"
                  loading={isPending}
                >
                  Log In
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Center>
    </Box>
  );
}
