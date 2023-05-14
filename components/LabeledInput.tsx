import { InputHTMLAttributes } from "react";
import labeledInlineStyle from "./LabeledInput.module.css";
export interface LabeledInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function LabeledInput({ label, id, ...props }: LabeledInputProps) {
  return (
    <div className={labeledInlineStyle.wrapper}>
      <label className={labeledInlineStyle.label} htmlFor={`${id}`}>
        {label}
      </label>
      <input
        {...props}
        id={id}
        className={props.className + " " + labeledInlineStyle.input}
      />
    </div>
  );
}

export default LabeledInput;
