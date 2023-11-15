import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import useGlobalStore from "../../store/globalStore";

const ChannelInfoModal = ({ children }: { children?: React.ReactNode }) => {
  const { channels, currentChannelId } = useGlobalStore();
  const currentChannel = channels[currentChannelId!];
  
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-neutral-800 z-30 top-0 left-0 right-0 bottom-0 fixed opacity-70" />
				<Dialog.Content className="fixed z-30 top-[50%] min-w-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-sm bg-neutral-100">
					<div className="flex flex-row gap-8 justify-between items-center">
						<Dialog.Title>
							<h2 className="text-lg font-bold">Channel Info</h2>
						</Dialog.Title>

						<Dialog.Close>
							<button className="border-2 border-neutral-700 rounded-full p-1">
								<XIcon className="w-5 h-5" />
							</button>
						</Dialog.Close>
					</div>
					<hr className="my-2 bg-neutral-800" />
					<div className="flex flex-col mt-4 gap-2">
					<label className="text-sm" htmlFor="channelid">
							Channel ID
						</label>
						<input
              readOnly
							type="text"
							id="channelid"
							className="outline-none read-only:text-neutral-700 select-none read-only:bg-neutral-300 p-1 rounded-sm px-2 border-neutral-800 border"
              value={currentChannelId!}
						/>
            <div/>

						<label className="text-sm" htmlFor="channelname">
							Channel Name
						</label>
						<input
              readOnly
							type="text"
							id="channelname"
							className="outline-none read-only:text-neutral-700 select-none read-only:bg-neutral-300 p-1 rounded-sm px-2 border-neutral-800 border"
              value={currentChannel.title}
						/>
            <div/>
						<label className="text-sm" htmlFor="channeldesc">
							Channel Description
						</label>
						<input
              readOnly
							type="text"
							id="channeldesc"
							className="outline-none read-only:text-neutral-700 select-none read-only:bg-neutral-300 p-1 rounded-sm px-2 border-neutral-800 border"
              value={currentChannel.description}
						/>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default ChannelInfoModal;
