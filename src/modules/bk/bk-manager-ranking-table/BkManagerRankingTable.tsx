import {
  Box,
  Title,
  Grid,
  Stack,
  Badge,
  Tooltip,
  ActionIcon,
  TypographyStylesProvider,
  Text,
  Flex,
  Image,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconBulb, IconUserCircle } from "@tabler/icons-react";
import { marked } from "marked";
import {
  FinancialModalContent,
  ModalContent,
} from "../bk-store-ranking/columns";
import {
  IconFifthPlace,
  IconFirstPlace,
  IconFourthPlace,
  IconSecondPlace,
  IconThirdPlace,
} from "~/assets";
import { GetManagersPicResponse } from "./api/useGetManagerManagersPic";

export type BkManagerRankingData = Array<{
  position: number;
  manager: string;
  fss: string;
  financials: string;
  insights: string;
  storeId: string;
}>;

interface BkManagerRankingTableProps {
  title: string;
  data: BkManagerRankingData;
  managersPic?: GetManagersPicResponse;
  isRed?: boolean;
}

export function BkManagerRankingTable({
  title,
  data,
  managersPic,
  isRed = false,
}: BkManagerRankingTableProps) {
  return (
    <Box>
      <Title order={5} mb="lg">
        {title}
      </Title>
      <Grid
        bg="hsl(var(--secondary))"
        c="hsl(var(--foreground) / 0.65)"
        fw={700}
        fz={14}
        px="md"
        style={{ borderRadius: 4 }}
        mb="lg"
      >
        <Grid.Col span={2}>Position</Grid.Col>
        <Grid.Col span={4}>Manager</Grid.Col>
        <Grid.Col span={2}>FSS</Grid.Col>
        <Grid.Col span={2}>Financials</Grid.Col>
        <Grid.Col span={2}>Total</Grid.Col>
      </Grid>
      <Stack gap="xs">
        {data.map((item, index) => {
          const managerProfilePic = managersPic?.users.find(
            (manager) =>
              manager.name === item.manager && manager.role_title === "RGM"
          );

          const managerFstName = item?.manager?.split(" ") || "";
          let placeIcon = null;
          if (item.position === 1) placeIcon = <IconFirstPlace />;
          else if (item.position === 2) placeIcon = <IconSecondPlace />;
          else if (item.position === 3) placeIcon = <IconThirdPlace />;
          else if (item.position === 4) placeIcon = <IconFourthPlace />;
          else if (item.position === 5) placeIcon = <IconFifthPlace />;
          return (
            <Grid
              key={index}
              // bg="hsl(var(--secondary))"
              c="hsl(var(--foreground) / 0.65)"
              fw={700}
              fz={14}
              px="md"
              py="md"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: 4,
              }}
            >
              <Grid.Col span={2}>
                {placeIcon ? placeIcon : item.position}
              </Grid.Col>
              <Grid.Col span={4} c="hsl(var(--foreground))">
                <Flex gap={"xs"} style={{ alignItems: "center" }}>
                  {managerProfilePic?.profile_url ? (
                    <Image
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%", // Ensures the image is circular
                        border: "2px solid rgba(255, 255, 255, 0.8)", // White border for contrast
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adds subtle depth
                        objectFit: "cover", // Covers the area without distortion
                        backgroundPosition: "center",
                        flexShrink: 0,
                        flexBasis: 40,
                      }}
                      src={
                        managerProfilePic?.profile_url ||
                        "path_to_default_image.jpg"
                      } // Provide a default image path if profile_url is empty
                      alt={`${managerFstName[0]}'s Profile Picture`} // Accessible description
                    />
                  ) : (
                    <IconUserCircle size={40} />
                  )}
                  <Stack gap={0}>
                    {managerFstName[0]}
                    <Text size="sm">{item.storeId}</Text>
                  </Stack>
                </Flex>
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(255, 138, 2,0.2)"
                  c="rgb(255, 138, 2)"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    modals.open({
                      title: "FSS Ranking Details",
                      children: <ModalContent storeId={item.storeId} />,
                    });
                  }}
                >
                  {item.fss}
                </Badge>
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(0, 132, 255, 0.2)"
                  c="rgb(0, 132, 255)"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    modals.open({
                      title: "Financial Ranking Details",
                      children: (
                        <FinancialModalContent storeId={item.storeId} />
                      ),
                    });
                  }}
                >
                  {item.financials}
                </Badge>
              </Grid.Col>
              <Grid.Col span={2}>
                <Box pos="relative">
                  <Badge
                    size="lg"
                    fw={700}
                    bg={
                      !isRed
                        ? "rgba(63, 221, 120, 0.24)"
                        : "rgba(255, 107, 107, 0.25)"
                    }
                    c={!isRed ? "rgb(63, 221, 120)" : "#FF6B6B"}
                  >
                    {parseInt(item.fss) + parseInt(item.financials)}
                  </Badge>
                  <Tooltip label="Overview">
                    <ActionIcon
                      pos="absolute"
                      style={{ top: 0, right: 0 }}
                      size="sm"
                      h={26}
                      variant="light"
                      onClick={() => {
                        const content = marked.parse(item.insights) as string;
                        modals.open({
                          size: "lg",
                          title: `${item.manager} - Overview`,
                          children: (
                            <TypographyStylesProvider>
                              <div
                                dangerouslySetInnerHTML={{ __html: content }}
                              ></div>
                            </TypographyStylesProvider>
                          ),
                        });
                      }}
                    >
                      <IconBulb size={14} />
                    </ActionIcon>
                  </Tooltip>
                </Box>
              </Grid.Col>
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
}
