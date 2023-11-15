import { ChevronRightCircle } from "lucide-react";
import React from "react";
import useGlobalStore from "../store/globalStore";

type ChannelBoxType = {
	title: string;
	channelId: string;
};

const ChannelBox: React.FC<ChannelBoxType> = (props) => {
	const { setCurrentChannelId, currentChannelId } = useGlobalStore();
	const activeChannel = currentChannelId == props.channelId;

	function onParentClicked() {
		setCurrentChannelId(props.channelId);
	}

	return (
		<div
			onClick={onParentClicked}
			className={`p-2 ${
				activeChannel ? "bg-neutral-900" : "bg-neutral-800"
			} cursor-pointer hover:bg-neutral-900 border border-neutral-500 group flex flex-row rounded-sm justify-between gap-1 items-center`}
		>
			<h2 className={activeChannel ? "text-green-300" : ''}>{props.title}</h2>
			<button className="group-hover:block hidden">
				<ChevronRightCircle className={activeChannel ? "text-green-300" : ''} />
			</button>
		</div>
	);
};

export default ChannelBox;
