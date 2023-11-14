import { SendHorizonal } from "lucide-react";
import { TextArea } from "./Input";
import RecentContactSidebar from "./recentContactSidebar";
import { useEffect, useRef, useState } from "react";
import MessagePanel from "./messagePanel";

const msgs = [
	{
		message: "Hello",
		fromMe: true,
		time: 1699948305025,
	},
	{
		message: "Hello there",
		fromMe: false,
		time: 1619958337350,
	},
	{
		message: "Hi Team",
		fromMe: false,
		time: 1693358349608,
	},
	{
		message: "Hello",
		fromMe: true,
		time: 16945958305025,
	},
	{
		message: "Hello there",
		fromMe: false,
		time: 1695558337350,
	},
	{
		message: "Hi Team",
		fromMe: false,
		time: 16956958349608,
	},
	{
		message: "Hello",
		fromMe: true,
		time: 1699978305025,
	},
	{
		message: "Hello there",
		fromMe: false,
		time: 1698958335350,
	},
	{
		message: "Hi Team",
		fromMe: false,
		time: 1691958348608,
	},
	{
		message: "Hi Team",
		fromMe: false,
		time: 1699458349708,
	},
];

const ChatWindow = () => {
	const [messages, setMessages] = useState(msgs);
	const [currentMsg, setCurrentMsg] = useState("");
	const messagesContainer = useRef<any>();

	function sendMessage() {
		if (!currentMsg.trim()) {
			setCurrentMsg("");
			return;
		}
		setMessages((p) => [
			...p,
			{ fromMe: true, message: currentMsg, time: Date.now() },
		]);
		setCurrentMsg("");
	}

	useEffect(() => {
		messagesContainer.current.scrollTop =
			messagesContainer.current.scrollHeight;
	}, [messages]);

	return (
		<div className="w-screen text-white h-screen">
			<div className="grid grid-cols-5">
				<div className="col-span-1 h-screen border-r-4 border-r-neutral-700 outline-slate-400">
					<RecentContactSidebar />
				</div>
				<div className="col-span-4 flex flex-col justify-end h-screen">
					<div className="bg-neutral-800 border-2 border-neutral-700 border-l-0 p-4">
						<h2 className="text-lg font-semibold">Header</h2>
					</div>
					<div
						ref={messagesContainer}
						className="overflow-y-auto p-2 custom-scrollbar"
					>
						<MessagePanel messages={messages} />
					</div>
					<div className="flex gap-3 px-2 mb-1 flex-row justify-center items-center">
						<TextArea
							value={currentMsg}
							// @ts-ignore
							onChange={(e) => setCurrentMsg(e.target.value)}
							className="w-full"
							placeholder="Enter message"
						/>
						<button
							onClick={sendMessage}
							className="rounded-full bg-neutral-700 border border-neutral-700 active:border-neutral-400 active:bg-neutral-700 hover:bg-neutral-600 p-3"
						>
							<SendHorizonal />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatWindow;
