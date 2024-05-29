import { AvatarProps, Avatar as MantineAvatar } from "@mantine/core";

export function Avatar({
  fullName,
  ...props
}: { fullName: string } & AvatarProps) {
  const avatarName = fullName
    .split(" ")
    .splice(0, 2)
    .map((el) => el[0])
    .join("");
  return (
    <MantineAvatar
      styles={{
        placeholder: {
          backgroundColor: "#789ccc",
          color: "hsl(var(--primary-foreground))",
        },
      }}
      radius="xl"
      size="lg"
      {...props}
    >
      {avatarName}
    </MantineAvatar>
  );
}
