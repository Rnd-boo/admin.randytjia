import instance from "@/lib/instance";
import { ILogin } from "@/types/auth";

const authServices = {
  login: (payload: ILogin) => instance.post("login", payload),
  getProfileWithToken: (token: string) =>
    instance.get(`/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: () => instance.get(`/me`),
};

export default authServices;
