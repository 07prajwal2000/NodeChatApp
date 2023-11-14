export type Response<T> = {
  data: T;
  success: boolean;
  messageType: MessageTypes;
}

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