import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";
import { storage } from "~/lib/storage";

export interface ConfigurationResponse {
  company: Company;
  role: Role;
  user_preferences: UserPreferences;
  is_partner: number;
  permissions: Permissions;
}

export interface Company {
  company_id: number;
  timesheet: Timesheet;
  custom_names: CustomNames;
  is_scheduler: number;
  azalio_pin_length: any;
  azalio_pin_auto_generate: number;
  is_scheduler_notification: number;
  is_region: number;
  is_team: number;
  is_chat_notification: number;
  is_task: number;
  is_tasks: number;
  is_timeoff: number;
  is_azalio_play: number;
  is_rewards: number;
  is_rewards_gateway: number;
  is_location: number;
  is_camera: number;
  is_timesheet_note: any;
  is_communication: number;
  is_geofencing: number;
  is_recognition: number;
  is_manual_recognition: number;
  fixed_schedule: number;
  pre_schedule_buffer_time: number;
  post_schedule_buffer_time: number;
  weeks_for_schedules: number;
  week_start_date: string;
  scheduling_notification_time: number;
  week_start_day: number;
  boring2Fun: number;
  interactive_communication: number;
  is_automation: number;
  store_level_settings: number;
  theme: Theme;
  is_open_shift: number;
  is_swap_shift: number;
  accept_open_shift_anyway: number;
  open_manager_approval: number;
  swap_manager_approval: number;
  is_sms_checkbox: number;
  is_askq: number;
  has_external_data: number;
  is_only_comm: number;
  automation_triggers: number;
  is_askq_automations: number;
  is_fss_survey_dashbord: number;
}

export interface Timesheet {
  is_third_shift: number;
  shift_hours: number;
  max_daily_hours: any;
  max_weekly_hours: any;
  week_start_date: string;
  is_edit_own: number;
  week_start_day: number;
}

export interface CustomNames {
  task: string;
  start: string;
  end: string;
  region: string;
  team: string;
  job_plural: any;
  task_plural: string;
  start_plural: string;
  end_plural: string;
  region_plural: string;
  team_plural: string;
}

export interface Theme {
  logo: any;
  color_primary: any;
  color_secondary: any;
}

export interface Role {
  role_id: number;
  role_title: string;
  modules: Modules;
}

export interface Modules {
  OrganisationManagement: OrganisationManagement;
  JobManagement: JobManagement;
  TimesheetManagement: TimesheetManagement;
  Communication: Communication;
  Recognition: Recognition;
  Settings: Settings;
  Schedules: Schedules;
  Tasks: Tasks;
  Rewards: Rewards;
  AzalioPlayUser: AzalioPlayUser;
  AzalioPlayAdmin: AzalioPlayAdmin;
  AutomationManagement: AutomationManagement;
}

export interface OrganisationManagement {
  enabled: boolean;
}

export interface JobManagement {
  enabled: boolean;
}

export interface TimesheetManagement {
  enabled: boolean;
}

export interface Communication {
  enabled: boolean;
}

export interface Recognition {
  enabled: boolean;
}

export interface Settings {
  enabled: boolean;
}

export interface Schedules {
  enabled: boolean;
}

export interface Tasks {
  enabled: boolean;
}

export interface Rewards {
  enabled: boolean;
}

export interface AzalioPlayUser {
  enabled: boolean;
}

export interface AzalioPlayAdmin {
  enabled: boolean;
}

export interface AutomationManagement {
  enabled: boolean;
}

export interface UserPreferences {
  show_region_filter: boolean;
}

export interface Permissions {
  Tasks: Tasks2;
  Rewards: Rewards2;
}

export interface Tasks2 {
  add: number;
  assign: number;
  delete: number;
  update: number;
  add_bulk: number;
}

export interface Rewards2 {
  reset_points: number;
}

const getConfigurations = async (): Promise<ConfigurationResponse> => {
  // companyId exists when logged in as superadmin
  const companyId = storage.getCompanyId();
  const roleId = storage.getRoleId(); // roleId "1" = SuperAdmin
  if (companyId || roleId !== "1") {
    const user = await axios
      .get("/auth/getConfigurations")
      .then((res) => res.data);
    return user;
  }
  return axios.get("/super_admin/getInfo").then((res) => res.data);
};

type UseConfigurationOptions = {
  config?: Omit<UseQueryOptions<ConfigurationResponse>, "queryKey" | "queryFn">;
};

export function useConfigurations({ config }: UseConfigurationOptions = {}) {
  return useQuery({
    queryKey: ["configurations"],
    queryFn: () => getConfigurations(),
    ...config,
  });
}
