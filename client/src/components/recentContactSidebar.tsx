import { PlusCircle, Users } from "lucide-react";
import JoinChannelModal from "./modals/joinChannelModal";
import CreateChannelModal from "./modals/createChannelModal";
import useGlobalStore from "../store/globalStore";
import ChannelBox from "./channelBox";
import { useWebsocketContext } from "../App";

const RecentContactSidebar = () => {
	const { userId, channels } = useGlobalStore();
	const { CreateChannel, JoinChannel } = useWebsocketContext()!;

	function joinChannel(id: string) {
		JoinChannel(id);
	}

	function onCreateChannelSubmit(name: string, desc: string) {
		CreateChannel({title: name, description: desc});
	}

	return (
		<div className="flex flex-col gap-2 p-2">
			{userId && (
				<>
					<div className="text-center">
						User Id:&nbsp;&nbsp;
						<span className="text-sm">{userId}</span>
					</div>
					<hr />
				</>
			)}
			<JoinChannelModal onSubmit={joinChannel}>
				<button className="bg-neutral-900 p-2 hover:bg-neutral-700 border border-neutral-800 active:bg-neutral-900 hover:border-neutral-600 rounded-sm flex justify-center gap-2">
					<PlusCircle className="w-5" /> <span>Join Channel</span>
				</button>
			</JoinChannelModal>
			<CreateChannelModal onSubmit={onCreateChannelSubmit}>
				<button className="bg-neutral-900 p-2 hover:bg-neutral-700 border border-neutral-800 active:bg-neutral-900 hover:border-neutral-600 rounded-sm flex justify-center gap-2">
					<Users className="w-5" /> <span>Create Channel</span>
				</button>
			</CreateChannelModal>
			<div className="py-2">
				<h2 className="text-xl text-center font-bold">
					Recent Channels
				</h2>
				<hr />
				<div className="flex flex-col gap-2 my-2">
					{Object.keys(channels).map((chId) => (
						<ChannelBox
							channelId={chId}
							title={channels[chId].title}
							key={chId}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default RecentContactSidebar;
