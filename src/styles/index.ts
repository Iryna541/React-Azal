import {
  Accordion,
  ActionIcon,
  Anchor,
  AppShell,
  AppShellHeader,
  AppShellNavbar,
  Badge,
  Button,
  Container,
  Divider,
  Input,
  Loader,
  Menu,
  Modal,
  NavLink,
  Notification,
  Pagination,
  Paper,
  PasswordInput,
  Pill,
  Popover,
  SegmentedControl,
  Select,
  Table,
  Tabs,
  TagsInput,
  Text,
  TextInput,
  Title,
  createTheme,
  rem,
} from "@mantine/core";

import accordionClasses from "./css/Accordion.module.css";
import actionIconClasses from "./css/ActionIcon.module.css";
import anchorClasses from "./css/Anchor.module.css";
import appShellClasses from "./css/AppShell.module.css";
import badgeClasses from "./css/Badge.module.css";
import buttonClasses from "./css/Button.module.css";
import containerClasses from "./css/Container.module.css";
import dividerClasses from "./css/Divider.module.css";
import inputClasses from "./css/Input.module.css";
import loaderClasses from "./css/Loader.module.css";
import menuClasses from "./css/Menu.module.css";
import modalClasses from "./css/Modal.module.css";
import navlinkClasses from "./css/NavLink.module.css";
import notificationClasses from "./css/Notification.module.css";
import paperClasses from "./css/Paper.module.css";
import passwordInputClasses from "./css/PasswordInput.module.css";
import popoverClasses from "./css/Popover.module.css";
import segmentedControlClasses from "./css/SegmentedControl.module.css";
import selectClasses from "./css/Select.module.css";
import tableClasses from "./css/Table.module.css";
import tabsClasses from "./css/Tabs.module.css";
import tagsInputClasses from "./css/TagsInput.module.css";
import textClasses from "./css/Text.module.css";
import paginationClasses from "./css/Pagination.module.css";
import textInputClasses from "./css/TextInput.module.css";
import titleClasses from "./css/Title.module.css";
import pillClasses from "./css/Pill.module.css";

export const resolver = () => ({
  variables: { "--radius": "0.5rem" },
  light: {
    "--background": "0 0% 100%", // UPDATED
    "--foreground": "0 0% 45%", // UPDATED
    "--card": "0 0% 100%",
    "--card-foreground": "235 14% 35%",
    "--popover": "0 0% 100%",
    "--popover-foreground": "235 14% 35%",
    "--primary": "209 100% 50%", // UPDATED
    "--primary-foreground": "0 0% 100%", // UPDATED
    "--secondary": "200 7% 9%", // UPDATED
    "--secondary-foreground": "0 0% 100%", // UPDATED
    "--muted": "210 40% 96.1%",
    "--muted-foreground": "216 27% 72%", // UPDATED
    "--accent": "238 100% 70%",
    "--accent-foreground": "222.2 47.4% 11.2%",
    "--destructive": "0 84.2% 60.2%",
    "--destructive-foreground": "210 40% 98%",
    "--border": " 0 0% 81%", // UPDATED
    "--input": "0 0% 81%", // UPDATED
    "--ring": "218 91% 59%", // UPDATED
    "--bk-background": "15 60% 20%",
    "--bk-foreground": "0 0% 100%",
  },
  dark: {},
});

export const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  shadows: {
    xs: "0 1px 2px 0 rgba(0,0,0,.05)",
  },
  headings: {
    sizes: {
      h1: {
        fontSize: rem(48),
        lineHeight: rem(48),
      },
      h2: {
        fontSize: rem(30),
        lineHeight: rem(36),
      },
      h3: {
        fontSize: rem(26),
        lineHeight: rem(32),
      },
      h4: {
        fontSize: rem(20),
        lineHeight: rem(28),
      },
      h5: {
        fontSize: rem(18),
        lineHeight: rem(28),
      },
      h6: {
        fontSize: rem(16),
        lineHeight: rem(28),
      },
    },
  },
  breakpoints: {
    xs: "40em",
    sm: "48em",
    md: "64em",
    lg: "80em",
    xl: "87.5em",
  },
  components: {
    Accordion: Accordion.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: accordionClasses,
    }),
    Container: Container.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: containerClasses,
    }),
    Title: Title.extend({
      classNames: titleClasses,
    }),
    Button: Button.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: buttonClasses,
    }),
    Text: Text.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: textClasses,
    }),
    Pagination: Pagination.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: paginationClasses,
    }),
    AppShell: AppShell.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: appShellClasses,
    }),
    AppShellHeader: AppShellHeader.extend({
      defaultProps: { variant: "azalio-ui" },
    }),
    AppShellNavbar: AppShellNavbar.extend({
      defaultProps: { variant: "azalio-ui" },
    }),
    Anchor: Anchor.extend({
      defaultProps: { variant: "azalio-ui", underline: "never" },
      classNames: anchorClasses,
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: actionIconClasses,
    }),
    Select: Select.extend({
      defaultProps: { variant: "azalio-ui", withCheckIcon: false },
      classNames: selectClasses,
    }),
    Table: Table.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: tableClasses,
    }),
    TextInput: TextInput.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: textInputClasses,
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: passwordInputClasses,
    }),
    Input: Input.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: inputClasses,
    }),
    NavLink: NavLink.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: navlinkClasses,
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: segmentedControlClasses,
    }),
    Paper: Paper.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: paperClasses,
    }),
    Badge: Badge.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: badgeClasses,
    }),
    Tabs: Tabs.extend({
      classNames: tabsClasses,
    }),
    Popover: Popover.extend({
      classNames: popoverClasses,
    }),
    Divider: Divider.extend({
      classNames: dividerClasses,
    }),
    Menu: Menu.extend({
      defaultProps: {
        variant: "azalio-ui",
        transitionProps: { transition: "pop", duration: 150 },
      },
      classNames: menuClasses,
    }),
    Notification: Notification.extend({
      defaultProps: {
        variant: "azalio-ui",
        closeButtonProps: { variant: "azalio-ui" },
      },
      classNames: notificationClasses,
    }),
    Modal: Modal.extend({
      defaultProps: { variant: "azalio-ui", overlayProps: { blur: 8 } },
      classNames: modalClasses,
    }),
    TagsInput: TagsInput.extend({
      defaultProps: { variant: "azalio-ui" },
      classNames: tagsInputClasses,
    }),
    Loader: Loader.extend({
      defaultProps: { variant: "azalio-ui", size: "xs" },
      classNames: loaderClasses,
    }),
    Pill: Pill.extend({
      classNames: pillClasses,
    }),
  },
});
