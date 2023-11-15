import { z } from "zod";

export type ClientRequest = z.infer<typeof clientRequestSchema>;

export enum MessageTypes {
  CONNECTION_OK = 'conn_ok',
  CONNECTION_FAIL = 'conn_fail',
  DISCONNECT = 'disconn',

  CHANNEL_CREATE = 'chan_create',
  CHANNEL_MESSAGE_SEND = 'chan_sendmsg',
  CHANNEL_MESSAGE_GET = 'chan_getmsg',
  CHANNEL_JOIN = 'chan_join',
  CHANNEL_EXIT = 'chan_exit',
}

export const clientRequestSchema = z.object({
  data: z.any(),
  messageType: z.nativeEnum(MessageTypes),
})

export enum ServerSentEvents {
  SERVER_ERROR = 'server_err',
  CONNECTED = 'user_connect',
  DATA_ERROR = 'data_err',
  CHANNEL_CREATED = 'chan_created',
  CHANNEL_JOINED = 'chan_joined',
  CHANNEL_JOIN_FAIL = 'chan_join_fail',
  CHANNEL_SEND_MESSAGE = 'chan_msg_sent',
  CHANNEL_MESSAGES = 'chan_msgs_get',
}