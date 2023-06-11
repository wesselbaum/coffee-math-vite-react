import { ReceiptInterface as ReceiptInterface } from "../lib/ReceiptInterface.ts";

export interface ReceiptProps {
  receipt?: ReceiptInterface;
}

function Receipt({ receipt }: ReceiptProps) {
  return (
    <>
      <p>{receipt.name}</p>
      <p>
        <small>Verhältnis</small>
        {receipt.ratioConf.relationship.coffeeG}/
        {receipt.ratioConf.relationship.waterMl}
      </p>
      <a href={"./edit"}>Edit</a>
    </>
  );
}

export default Receipt;
