import { Box, Divider, Paper, Title } from "@mantine/core";
import { PropsWithChildren } from "react";

export interface TitleBoxProps {
  title: string;
  subtitle: string;
}

export default function TitleBox({
  title,
  subtitle,
  children,
}: PropsWithChildren<TitleBoxProps>) {
  return (
    <Paper>
      <Box px="lg" py="md">
        <Title order={5} fw={500} fz={16}>
          {title}
        </Title>
        <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
          {subtitle}
        </Title>
      </Box>
      <Divider />
      {children}
    </Paper>
  );
}
