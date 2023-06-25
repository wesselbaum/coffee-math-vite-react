import { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export interface LabeledInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function LabeledInput({ label, id, ...props }: LabeledInputProps) {
  return (
    <div className={""} style={{ border: "1px solid red" }}>
      <FormControl variant="floating" isRequired>
        <Input
          placeholder=" "
          className={props.className}
          onChange={props.onChange}
          id={id}
          value={props.value}
        />
        <FormLabel>{label}</FormLabel>
        <FormErrorMessage>{label} is invalid</FormErrorMessage>
      </FormControl>
    </div>
  );
}

export default LabeledInput;
