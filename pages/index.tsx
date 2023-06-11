import { ChangeEvent, useState } from "react";
import "../App.css";

import {
  calculateWaterFromCoffee,
  calculateGroundsFromCoffee,
  calculateCoffeeFromGrounds,
  calculateWaterFromGrounds,
  calculateCoffeeFromWater,
  calculateGroundsFromWater,
  RatioConf,
} from "coffeemathlib/RatioCalculator";
import LabeledInput from "../components/LabeledInput.tsx";
import Receipt from "../components/Receipt.tsx";

const ratioConf: RatioConf = {
  waterInGroundCoffeeCapacity: 2.2,
  relationship: { waterMl: 16, coffeeG: 1 },
};

const numberToStringOrEmpty = (num: number): string => {
  if (isNaN(num)) {
    return "";
  }
  return num.toFixed(2);
};

function App() {
  const [waterAmount, setWaterAmount] = useState<string>("");
  const [coffeeAmount, setCoffeeAmount] = useState<string>("");
  const [groundsAmount, setGroundsAmount] = useState<string>("");

  const onCoffeeAmountChange = (value: string) => {
    setCoffeeAmount(value);
    setWaterAmount(
      numberToStringOrEmpty(
        calculateWaterFromCoffee(parseInt(value), ratioConf)
      )
    );
    setGroundsAmount(
      numberToStringOrEmpty(
        calculateGroundsFromCoffee(parseInt(value), ratioConf)
      )
    );
  };

  const onWaterAmountChange = (value: string) => {
    setWaterAmount(value);
    setCoffeeAmount(
      numberToStringOrEmpty(
        calculateCoffeeFromWater(parseInt(value), ratioConf)
      )
    );
    setGroundsAmount(
      numberToStringOrEmpty(
        calculateGroundsFromWater(parseInt(value), ratioConf)
      )
    );
  };

  const onGroundsAmountChange = (value: string) => {
    setGroundsAmount(value);

    setCoffeeAmount(
      numberToStringOrEmpty(
        calculateCoffeeFromGrounds(parseInt(value), ratioConf)
      )
    );
    setWaterAmount(
      numberToStringOrEmpty(
        calculateWaterFromGrounds(parseInt(value), ratioConf)
      )
    );
  };

  return (
    <>
      <Receipt receipt={{ name: "Büro 1:16", ratioConf: ratioConf }} />
      <LabeledInput
        id={"waterAmount"}
        label={"Water"}
        type={"text"}
        value={waterAmount}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onWaterAmountChange(e.currentTarget.value)
        }
        pattern="[0-9]+([\.,][0-9]+)?"
        placeholder={"ml/g"}
      />

      <LabeledInput
        id={"coffeeAmount"}
        label={"Coffee"}
        type={"text"}
        value={coffeeAmount}
        onChange={(e) => onCoffeeAmountChange(e.currentTarget.value)}
        pattern="[0-9]+([\.,][0-9]+)?"
        placeholder={"ml/g"}
      />

      <LabeledInput
        label={"Grounds"}
        id={"groundsAmount"}
        type={"text"}
        value={groundsAmount}
        onChange={(e) => onGroundsAmountChange(e.currentTarget.value)}
        pattern="[0-9]+([\.,][0-9]+)?"
        placeholder={"g"}
      />
    </>
  );
}

export default App;
