import NextAuth from 'next-auth'; // Import NextAuth.js (version 4.24.8 or later) for authentication
import GoogleProvider from 'next-auth/providers/google'; // Import the Google provider for social login (if applicable)
import { PrismaAdapter } from '@next-auth/prisma-adapter'; // Import Prisma adapter for NextAuth.js (version 1.0.4 or later)
import { PrismaClient } from '@prisma/client'; // Import Prisma client (version 5.20.0 or later) for database interactions

const prisma = new PrismaClient(); // Create a new Prisma client instance

export default NextAuth({
  adapter: PrismaAdapter(prisma), // Configure the adapter to use Prisma for session storage
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Fetch Google Client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Fetch Google Client Secret from environment variables
    }),
    // ... other providers if needed
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // If user exists, update the JWT token with user data
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      // If social login, update the JWT token with account data
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Update the session with user data from the JWT token
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
});