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
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  clearCompanyId: () => {
    window.localStorage.removeItem(`${storagePrefix}company_id`);
  },
};
