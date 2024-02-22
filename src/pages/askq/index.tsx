import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { LayoutWithSidebar } from "~/components/LayoutWithSidebar";
import { Calendar } from "@mantine/dates";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";

export default function DashboardPage() {
  const data = [
    {
      bg: "#E5FFF9",
      dark: "#3BE8B0",
      heading: "Sales",
      money: "$24,034",
      text: "30 stores increased sales by over 5.2% while 8 stores saw a 4.2% decrease in the last week.",
    },
  ];
  return (
    <ProtectedRoute>
      <LayoutWithSidebar
        sidebar={
          <Box p={24}>
            <Calendar weekdayFormat="ddd" />
          </Box>
        }
      >
        <Box>
          <Title order={3}>Good Morning!</Title>
          <Stack align="center" mt="xl">
            <Image
              height={50}
              width={50}
              src="https://demo.azal.io/assets/sparkles.png"
              style={{ height: 50, width: 50 }}
            />
            <Box>
              <Title order={3}>What would you like to do with your data?</Title>
              <Text mt="xs">
                Ask our database a question about your data and get a response
                in seconds!
              </Text>
            </Box>
            <TextInput
              w="100%"
              placeholder="Let's learn more about your business. Ask a question about your data."
              rightSection={
                <ActionIcon
                  size="lg"
                  radius={6}
                  variant="azalio-ui-light"
                  mr={3}
                >
                  <IconSend size={16} />
                </ActionIcon>
              }
              rightSectionWidth={40}
            />
          </Stack>
          <Box mt="xl">
            <Text>
              You have the opportunity to save <Badge>$51,062</Badge> across
              your 10 locations
            </Text>
            <Box mt="md">
              {data.map((item) => {
                return (
                  <Flex
                    key={item.bg}
                    bg={item.bg}
                    p="lg"
                    gap="lg"
                    style={{ borderRadius: 8 }}
                  >
                    <Box
                      bg={item.dark}
                      h={100}
                      w={100}
                      style={{
                        flexBasis: 100,
                        flexGrow: 0,
                        flexShrink: 0,
                        borderRadius: 8,
                      }}
                    ></Box>
                    <Box>
                      <Flex gap="sm" align="center">
                        <Title order={4}>{item.heading}</Title>
                        <Badge bg={item.dark} c="white" size="md" fw={700}>
                          {item.money}
                        </Badge>
                      </Flex>
                      <Text mt="xs">{item.text}</Text>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </Box>
      </LayoutWithSidebar>
    </ProtectedRoute>
  );
}
