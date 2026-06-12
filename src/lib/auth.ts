import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authServices from "@/services/auth.service";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/auth";
import environment from "@/configs/environment";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },

  secret: environment.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const loginResult = await authServices.login({
          username: credentials.username,
          password: credentials.password,
        });

        const accessToken = loginResult.data.data;

        const profile = await authServices.getProfileWithToken(accessToken);

        const user = profile.data.data;

        if (!user) return null;

        return {
          ...user,
          accessToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
};
