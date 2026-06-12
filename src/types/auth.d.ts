import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ILogin {
  username: string;
  password: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface UserExtended extends User {
  accessToken?: string;
  username?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}
