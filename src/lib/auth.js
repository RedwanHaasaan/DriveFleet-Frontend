import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dns from "dns/promises";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const client = new MongoClient(process.env.MONGO_URI);
const db =  client.db(process.env.DB_NAME);
export const auth = betterAuth({
    database: mongodbAdapter(db, {
    client
  }),

  emailAndPassword: {
    enabled: true,
  },
});

