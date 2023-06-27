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
    <div className={""}>
      <FormControl variant="floating" mb={8} isRequired={props.required}>
        <Input
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
          className={props.className}
          onChange={props.onChange}
          id={id}
          name={props.name}
          value={props.value}
        />
        <FormLabel>{label}</FormLabel>
        <FormErrorMessage>{label} is invalid</FormErrorMessage>
      </FormControl>
    </div>
  );
}

export default LabeledInput;
