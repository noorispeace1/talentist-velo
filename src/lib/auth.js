import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    client
  }),
  user: {
    additionalFields: {
      signUpRole: {
        type: "string",
        required: false,
        defaultValue: "seeker",
        input: true
      },
      role: {
        default: "seeker",
      },
      plan: {
        default: "seeker_free",
      }
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const assignedRole = user.signUpRole || 'seeker';
          return {
            data: {
              ...user,
              role: assignedRole,
            }
          };
        }
      }
    }
  },
  plugins: [
    admin()
  ]
});