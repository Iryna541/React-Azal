const storagePrefix = "az__";

type Token = {
  accessToken: string;
};

export const storage = {
  getToken: (): string | null => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  getCompanyId: (): string | null => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}company_id`) as string
    );
  },
  getRoleId: (): string | null => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}role_id`) as string
    );
  },
  setCompanyId: (id: string) => {
    window.localStorage.setItem(
      `${storagePrefix}company_id`,
      JSON.stringify(id)
    );
  },
  setToken: ({ accessToken }: Token) => {
    window.localStorage.setItem(
      `${storagePrefix}token`,
      JSON.stringify(accessToken)
    );
  },
  setRoleId: (roleId: string) => {
    window.localStorage.setItem(
      `${storagePrefix}role_id`,
      JSON.stringify(roleId)
    );
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  clearCompanyId: () => {
    window.localStorage.removeItem(`${storagePrefix}company_id`);
  },
  clearRoleId: () => {
    window.localStorage.removeItem(`${storagePrefix}role_id`);
  },
};
