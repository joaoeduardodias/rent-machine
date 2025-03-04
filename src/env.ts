import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  CLOUDFARE_ENDPOINT: z.string().url(),
  CLOUDFARE_R2_TOKEN: z.string(),
  CLOUDFARE_BUCKET_NAME: z.string(),
  CLOUDFARE_ACCESS_KEY_ID: z.string(),
  CLOUDFARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFARE_DOMAIN_PUBLIC: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  API_KEY: z.string(),
  NEXT_PUBLIC_NAME_OWNER: z.string(),
  NEXT_PUBLIC_EMAIL_OWNER: z.string(),
  EMAIL_SENDER: z.string().email(),
  NAME_SENDER: z.string(),
});

export const env = envSchema.parse(process.env);
