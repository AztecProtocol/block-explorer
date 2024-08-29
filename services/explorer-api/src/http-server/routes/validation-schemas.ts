import { z } from "zod";

export const getBlockSchema = z.object({
  params: z.object({
    heightOrHash: z.string(),
  })
});
