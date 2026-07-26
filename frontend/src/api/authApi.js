import { api } from "../lib/axios";

export const authApi = {
  login: (credentials) =>
    api.post("/auth/login", credentials).then((r) => r.data),
};
