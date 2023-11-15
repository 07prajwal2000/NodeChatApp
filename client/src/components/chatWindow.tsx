import { InfoIcon, SendHorizonal } from "lucide-react";
import { TextArea } from "./Input";
import RecentContactSidebar from "./recentContactSidebar";
import { useEffect, useRef, useState } from "react";
import MessagePanel from "./messagePanel";
import { useWebsocketContext } from "../App";
import useGlobalStore from "../store/globalStore";
import ChannelInfoModal from "./modals/channelInfoModal";

const ChatWindow = () => {
	const { currentChannelId, channels } = useGlobalStore();
	const [currentMsg, setCurrentMsg] = useState("");
	const messagesContainer = useRef<any>();
	const { sendMessageToChannel } = useWebsocketContext()!;

	function sendMessage() {
		if (!currentMsg.trim() || !currentChannelId) {
			setCurrentMsg("");
			return;
		}
		setCurrentMsg("");
		sendMessageToChannel(currentChannelId, currentMsg);
	}

	useEffect(() => {
		if (
			!messagesContainer ||
			!messagesContainer.current ||
			!currentChannelId
		)
			return;

		messagesContainer.current.scrollTop =
			messagesContainer.current.scrollHeight;
	});

	return (
		<div className="w-screen text-white h-screen">
			<div className="grid grid-cols-5">
				<div className="col-span-1 h-screen border-r-4 border-r-neutral-700 outline-slate-400">
					<RecentContactSidebar />
				</div>
				{currentChannelId ? (
					<div className="col-span-4 flex flex-col justify-end h-screen">
						<div className="bg-neutral-800 flex flex-row justify-between items-center border-2 mb-auto border-neutral-700 border-l-0 p-4">
							<h2 className="text-lg font-semibold">
								{channels[currentChannelId].title}
							</h2>
							<ChannelInfoModal>
								<button className="rounded-full p-1 bg-neutral-700 hover:bg-neutral-800 border border-neutral-600 active:bg-neutral-900">
									<InfoIcon />{" "}
								</button>
							</ChannelInfoModal>
						</div>
						<div
							ref={messagesContainer}
							className="overflow-y-auto p-2 custom-scrollbar"
						>
							<MessagePanel
								messages={channels[currentChannelId].messages}
							/>
						</div>
						<div className="flex gap-3 px-2 bg-neutral-800 border-t border-t-neutral-500 py-4 flex-row justify-around items-center">
							<TextArea
								rows={1}
								value={currentMsg}
								// @ts-ignore
								onChange={(e) => setCurrentMsg(e.target.value)}
								className="w-full"
								placeholder="Enter message"
							/>
							<button
								onClick={sendMessage}
								className="rounded-full bg-neutral-700 border-neutral-700 active:bg-neutral-900 hover:bg-neutral-600 p-2"
							>
								<SendHorizonal />
							</button>
						</div>
					</div>
				) : (
					<div>
						<h2></h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatWindow;
