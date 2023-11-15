import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { useRef } from "react";

const CreateChannelModal = ({
	children,
	onSubmit,
}: {
	children?: React.ReactNode;
	onSubmit?: (name: string, desc: string) => void;
}) => {
	const nameRef = useRef<any>();
	const descRef = useRef<any>();

	function onEnterClicked() {
		onSubmit && onSubmit(nameRef.current.value, descRef.current.value);
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-neutral-800 z-30 top-0 left-0 right-0 bottom-0 fixed opacity-70" />
				<Dialog.Content className="fixed z-30 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[40%] p-4 rounded-sm bg-neutral-100">
					<div className="flex flex-row gap-8 justify-between items-center">
						<Dialog.Title>
							<h2 className="text-lg font-bold">Create Channel</h2>
						</Dialog.Title>

						<Dialog.Close>
							<button className="border-2 border-neutral-700 rounded-full p-1">
								<XIcon className="w-5 h-5" />
							</button>
						</Dialog.Close>
					</div>
					<hr className="my-2 bg-neutral-800" />
					<div className="flex flex-col mt-4 gap-2">
						<label className="text-sm" htmlFor="name">
							Enter Name
						</label>
						<input
							ref={nameRef}
							type="text"
							id="name"
							className="outline-none p-1 rounded-sm px-2 border-neutral-800 border"
							placeholder="Channel Name"
							maxLength={100}
						/>
						<label className="text-sm" htmlFor="desc">
							Enter Description
						</label>
						<input
							ref={descRef}
							type="text"
							id="desc"
							className="outline-none p-1 rounded-sm px-2 border-neutral-800 border"
							placeholder="Channel Description"
							maxLength={200}
						/>
						<Dialog.Close>
							<button
								onClick={onEnterClicked}
								className="w-full bg-neutral-500 text-white p-2 active:bg-neutral-700 rounded-sm hover:bg-neutral-600"
							>
								Create
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default CreateChannelModal;