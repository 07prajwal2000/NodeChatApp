import { z } from "zod";

export type MessageType = z.infer<typeof messageTypeSchema>;

export const CHANNEL_ID_SIZE = 5;

export const messageTypeSchema = z.object({
  message: z.string().min(1).max(200),
  channelId: z.string().length(CHANNEL_ID_SIZE),
  time: z.number().optional(),
  userId: z.string().optional(),
});

export const createChannelSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().max(200),
});

export type CreateChannelDto = z.infer<typeof createChannelSchema>;

export const joinChannelSchema = z.object({
  channelId: z.string().length(CHANNEL_ID_SIZE),
});

export type JoinChannelDto = z.infer<typeof joinChannelSchema>;

export const sendMessageToChannelSchema = z.object({
  channelId: z.string().length(CHANNEL_ID_SIZE),
  message: z.string(),
});

export type SendMessageToChannelDto = z.infer<typeof sendMessageToChannelSchema >;

export const getMessagesFromChannelSchema = z.object({
  channelId: z.string().length(CHANNEL_ID_SIZE),
});

export type GetMessagesFromChannelDto = z.infer<typeof getMessagesFromChannelSchema>;