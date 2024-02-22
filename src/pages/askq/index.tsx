import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { LayoutWithSidebar } from "~/components/LayoutWithSidebar";
import { Calendar } from "@mantine/dates";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { IconBubble, IconSaleTag, IconSparkles } from "~/assets";

const stats = [
  {
    backgroundColor: "#E5FFF9",
    iconBackgroundColor: "#3BE8B0",
    iconColor: "#fff",
    buttonColor: "#3BE8B0",
    title: "Sales",
    description:
      "30 stores increased sales by over 5.2% while 8 stores saw a 4.2% decrease in the last week.",
    value: "$24,034",
    icon: <IconSaleTag />,
  },
  {
    backgroundColor: "#FFFAED",
    iconBackgroundColor: "#FFEDBD",
    iconColor: "#FFB900",
    buttonColor: "#FFB900",
    title: "Inventory",
    description:
      "12 of 75 stores ran out of buns by evening shift before the restock the next day.",
    value: "$24,034",
    icon: <IconBubble />,
  },
  {
    backgroundColor: "#FFF5F5",
    iconBackgroundColor: "#FFE0E1",
    iconColor: "#FD636B",
    buttonColor: "#FD636B",
    title: "Labor",
    description:
      "32 West Blvd, 140 Main St. and 23 King St. were overstaffed between the hours of 9pm and 11pm.",
    value: "$24,034",
    icon: <IconSaleTag />,
  },
];

export default function DashboardPage() {
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
            <IconSparkles height={50} width={50} />
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
              styles={{
                input: {
                  height: 48,
                },
              }}
            />
          </Stack>
          <Box mt="xl">
            <Text>
              You have the opportunity to save <Badge>$51,062</Badge> across
              your 10 locations
            </Text>
            <Stack mt="md">
              {stats.map((item, index) => {
                return (
                  <Flex
                    p="lg"
                    gap="lg"
                    key={index}
                    bg={item.backgroundColor}
                    style={{ borderRadius: 8 }}
                  >
                    <Flex
                      bg={item.iconBackgroundColor}
                      h={108}
                      w={108}
                      align="center"
                      justify="center"
                      style={{
                        flexBasis: 108,
                        flexGrow: 0,
                        flexShrink: 0,
                        borderRadius: 8,
                      }}
                      c={item.iconColor}
                    >
                      {item.icon}
                    </Flex>
                    <Box>
                      <Flex gap="sm" align="center">
                        <Title order={4}>{item.title}</Title>
                        <Badge
                          bg={item.buttonColor}
                          c="white"
                          size="md"
                          fw={700}
                          styles={{
                            root: {
                              height: 24,
                              borderRadius: 4,
                              paddingLeft: 6,
                              paddingRight: 6,
                            },
                            label: {
                              fontSize: 14,
                            },
                          }}
                        >
                          {item.value}
                        </Badge>
                      </Flex>
                      <Text mt="xs" fw={500}>
                        {item.description}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </LayoutWithSidebar>
    </ProtectedRoute>
  );
}
