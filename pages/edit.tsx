import { ReceiptInterface } from "../lib/ReceiptInterface.ts";

export interface EditProps {
  receipt?: ReceiptInterface;
}

function Edit({ receipt }: EditProps) {
  return (
    <div>
      <span>Receipt: </span>
    </div>
  );
}

export default Edit;
