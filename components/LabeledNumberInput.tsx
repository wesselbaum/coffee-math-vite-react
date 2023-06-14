import { HTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
} from "@chakra-ui/react";

export type LabeledInputProps = Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> & {
  label: string;
  onChange: (value: string) => void;
};

function LabeledInput({ label, id, ...props }: LabeledInputProps) {
  return (
    <div className={""} style={{ border: "1px solid red" }}>
      <FormControl variant="floating" isRequired>
        <NumberInput
          placeholder=" "
          className={props.className}
          onChange={(valueAsString) => {
            if (props.onChange) {
              props.onChange(valueAsString);
            }
          }}
          id={id}
        />
        <FormLabel>{label}</FormLabel>
        <FormErrorMessage>{label} is invalid</FormErrorMessage>
      </FormControl>
    </div>
  );
}

export default LabeledInput;
