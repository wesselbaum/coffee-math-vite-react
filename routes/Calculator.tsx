import { useEffect, useState } from "react";

import {
  calculateCoffeeFromGrounds,
  calculateCoffeeFromWater,
  calculateGroundsFromCoffee,
  calculateGroundsFromWater,
  calculateWaterFromCoffee,
  calculateWaterFromGrounds,
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

const stringToFloat = (val: string): number => {
  return parseFloat(val.replace(",", "."));
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
        calculateWaterFromCoffee(stringToFloat(value), definitiveRatioConf)
      )
    );
    setGroundsAmount(
      numberToStringOrEmpty(
        calculateGroundsFromCoffee(stringToFloat(value), definitiveRatioConf)
      )
    );
  };

  const onWaterAmountChange = (value: string) => {
    setWaterAmount(value);
    setCoffeeAmount(
      numberToStringOrEmpty(
        calculateCoffeeFromWater(stringToFloat(value), definitiveRatioConf)
      )
    );
    setGroundsAmount(
      numberToStringOrEmpty(
        calculateGroundsFromWater(stringToFloat(value), definitiveRatioConf)
      )
    );
  };

  const onGroundsAmountChange = (value: string) => {
    setGroundsAmount(value);

    setCoffeeAmount(
      numberToStringOrEmpty(
        calculateCoffeeFromGrounds(stringToFloat(value), definitiveRatioConf)
      )
    );
    setWaterAmount(
      numberToStringOrEmpty(
        calculateWaterFromGrounds(stringToFloat(value), definitiveRatioConf)
      )
    );
  };

  return (
    <>
      <LabeledInput
        id={"waterAmount"}
        label={"Water"}
        value={waterAmount}
        onChange={(e) => onWaterAmountChange(e.currentTarget.value)}
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
