import { create } from "zustand";

export type ChannelMessageType = {
	channelId: string;
	message: string;
	time?: number | undefined;
	userId?: string;
};

type GlobalStoreType = {
	channels: {
		[channelId: string]: {
			title: string;
			description: string;
			messages: ChannelMessageType[];
		};
	};
	userId: string;
	setUserId: (id: string) => void;
  currentChannelId?: string | null;
  setCurrentChannelId: (id: string) => void;
	addMessage: (message: ChannelMessageType) => void;
	addChannel: (title: string, desc: string, channelId: string, messages?: ChannelMessageType[]) => void;
};

const useGlobalStore = create<GlobalStoreType>((set) => ({
	channels: {},
	userId: '',
	setUserId(id) {
		set(s => ({...s, userId: id}));
	},
  currentChannelId: null,
  setCurrentChannelId(id) {
    set(s => ({
      ...s,
      currentChannelId: id
    }))
  },
	addChannel(title, desc, channelId, messages) {
		set((state) => {
			const channels = { ...state.channels };
			channels[channelId] = {
				description: desc,
				title,
				messages: messages ? messages : [],
			};
			return {
				...state,
				channels,
			};
		});
	},
	addMessage(message) {
    set(state => {
      if (!(message.channelId! in state.channels)) {
        return state;
      }
      state.channels[message.channelId].messages.push(message);
      if (state.channels[message.channelId].messages.length > 100) {
        state.channels[message.channelId].messages.pop();
      }
      return {
        ...state
      };
    });
  },
}));

export default useGlobalStore;