import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
      user?: any;
      token?: any;
    }
  }