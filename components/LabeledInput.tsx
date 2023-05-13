import { InputHTMLAttributes } from "react";

export interface LabeledInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function LabeledInput({ label, id, ...props }: LabeledInputProps) {
  return (
    <div>
      <label htmlFor={`${id}`}>{label}</label>
      <input {...props} id={id} />
    </div>
  );
}

export default LabeledInput;
