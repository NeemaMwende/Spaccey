import { neon } from "@neondatabase/serverless";

// const databaseUrl = process.env.DATABASE_URL;
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const sql = neon(process.env.DATABASE_URL);
