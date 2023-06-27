import { HTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

export type LabeledInputProps = Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function LabeledInput({ label, value, id, ...props }: LabeledInputProps) {
  return (
    <div className={""}>
      <FormControl variant={"floating"} mb={8}>
        <NumberInput
          onChange={(valueAsString) => {
            if (props.onChange) {
              props.onChange(valueAsString);
            }
          }}
          value={value}
          placeholder={"x"}
        >
          <NumberInputField />
          <FormLabel>{label}</FormLabel>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
          <FormErrorMessage>{label} is invalid</FormErrorMessage>
        </NumberInput>
      </FormControl>
    </div>
  );
}

export default LabeledInput;
