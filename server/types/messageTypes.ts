import { z } from "zod";

export type MessageType = z.infer<typeof messageTypeSchema>;

export const CHANNEL_ID_SIZE = 5;

export const messageTypeSchema = z.object({
  message: z.string().min(1).max(200),
  channelId: z.string().length(CHANNEL_ID_SIZE),
  time: z.number().optional(),
  userId: z.string().optional(),
});