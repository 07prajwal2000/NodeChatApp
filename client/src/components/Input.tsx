import { FC, HTMLAttributes } from "react";

interface InputPropTypes extends HTMLAttributes<HTMLInputElement> {}

const Input: FC<InputPropTypes> = (props) => {
	return (
		<input
			{...props}
			spellCheck="false"
			className={
				"p-2 bg-neutral-700 text-md mx-2 border border-neutral-500 shadow-lg rounded-sm focus:outline focus:outline-slate-500 " +
				props.className
			}
		/>
	);
};

interface TextAreaPropTypes extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
}

export const TextArea: FC<TextAreaPropTypes> = (props) => {
	return (
		<textarea
			{...props}
			spellCheck="false"
			className={
				"p-2 bg-neutral-700 text-md scrollbar-hide mx-2 border resize-none border-neutral-500 shadow-lg rounded-sm focus:outline focus:outline-slate-500 " +
				props.className
			}
		>
			{props.value}
		</textarea>
	);
};

export default Input;
