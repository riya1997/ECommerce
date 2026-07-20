import { z } from "zod/v4";

const userSchema = z.strictObject({
  name: z.string().min(1, "name is required"),
  email: z.email("invalid email"),
  password: z.string().min(4, "password should be atleast 4 chars"),
});

export { userSchema };
