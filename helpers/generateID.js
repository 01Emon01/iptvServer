import { customAlphabet } from "nanoid";

export const generateId = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  14,
);
