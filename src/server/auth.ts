import { type GetServerSidePropsContext } from "next";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
import { cert } from "firebase-admin/app"
import { auth } from "../firebase"
//import { adminDb as firedb } from "~/firebase";
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      username: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter(
    {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      })
    }),
  pages: {
        signIn: "/login",
    //   signOut: "/auth/signout",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        signInWithEmailAndPassword(auth, credentials?.email!, credentials?.password!)
          .then(() => {
            console.log(auth.currentUser?.providerData)
            if (!auth.currentUser?.emailVerified) {
              console.log("User Email Not Verified!")
            }
          })
          .catch((err) => {
            console.log(err)
          })
        if (auth.currentUser) {
          return {
            id: auth.currentUser?.uid,
            email: auth.currentUser?.email,
            name: auth.currentUser?.uid,
          };
        }
        return null
      },
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

