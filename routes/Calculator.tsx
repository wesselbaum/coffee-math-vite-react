import { ChangeEvent, useEffect, useState } from "react";

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

const defaultRatioConf = {
  waterInGroundCoffeeCapacity: 2.2,
  relationship: { waterMl: 16, coffeeG: 1 },
};

interface CalculatorProps {
  ratioConf?: RatioConf;
}

const numberToStringOrEmpty = (num: number): string => {
  if (isNaN(num)) {
    return "";
  }
  return num.toFixed(2);
};

function Calculator({ ratioConf }: CalculatorProps) {
  const [waterAmount, setWaterAmount] = useState<string>("");
  const [coffeeAmount, setCoffeeAmount] = useState<string>("");
  const [groundsAmount, setGroundsAmount] = useState<string>("");

  const definitiveRatioConf = ratioConf ?? defaultRatioConf;

  useEffect(() => {
    setCoffeeAmount("");
    setWaterAmount("");
    setGroundsAmount("");
  }, [ratioConf]);

  const onCoffeeAmountChange = (value: string) => {
    setCoffeeAmount(value);
    setWaterAmount(
      numberToStringOrEmpty(
        calculateWaterFromCoffee(parseInt(value), definitiveRatioConf)
      )
    );
    setGroundsAmount(
      numberToStringOrEmpty(
        calculateGroundsFromCoffee(parseInt(value), definitiveRatioConf)
      )
    );
  };

  const onWaterAmountChange = (value: string) => {
    setWaterAmount(value);
    setCoffeeAmount(
      numberToStringOrEmpty(
        calculateCoffeeFromWater(parseInt(value), definitiveRatioConf)
      )
    );
    setGroundsAmount(
      numberToStringOrEmpty(
        calculateGroundsFromWater(parseInt(value), definitiveRatioConf)
      )
    );
  };

  const onGroundsAmountChange = (value: string) => {
    setGroundsAmount(value);

    setCoffeeAmount(
      numberToStringOrEmpty(
        calculateCoffeeFromGrounds(parseInt(value), definitiveRatioConf)
      )
    );
    setWaterAmount(
      numberToStringOrEmpty(
        calculateWaterFromGrounds(parseInt(value), definitiveRatioConf)
      )
    );
  };

  return (
    <>
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

export default Calculator;
