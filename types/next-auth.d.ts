import { DefaultUser, TokenSet } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      /**
       * The user's email address
       */
      email?: string | null;

      /**
       * The user's unique id number
       */
      id?: number | null;

      /**
       * The users preferred avatar.
       * Usually provided by the user's OAuth provider of choice
       */
      image?: string | null;

      /**
       * The user's full name
       */
      name?: string | null;

      url?: string | null;

      description?: string | null;
    };
  }

  interface User {
    /**
     * The user's email address
     */
    email?: string | null;

    /**
     * The user's unique id number
     */
    id: number;

    /**
     * The users preferred avatar.
     * Usually provided by the user's OAuth provider of choice
     */
    image?: string | null;

    /**
     * The user's full name
     */
    name?: string | null;

    url?: string | null;

    description?: string | null;
  }
}
