import { ChangeEvent, useState } from "react";
import "./App.css";

import {
  calculateWaterFromCoffee,
  calculateGroundsFromCoffee,
  calculateCoffeeFromGrounds,
  calculateWaterFromGrounds,
  calculateCoffeeFromWater,
  calculateGroundsFromWater,
} from "coffeemathlib/RatioCalculator";
import LabeledInput from "./components/LabeledInput.tsx";

const ratioConf = {
  waterInGroundCoffeeCapacity: 2.2,
  relationship: { waterMl: 16, coffeeG: 1 },
};

function App() {
  const [waterAmount, setWaterAmount] = useState<string>("");
  const [coffeeAmount, setCoffeeAmount] = useState<string>("");
  const [groundsAmount, setGroundsAmount] = useState<string>("");

  const onCoffeeAmountChange = (value: string) => {
    setCoffeeAmount(value);
    setWaterAmount(calculateWaterFromCoffee(parseInt(value), ratioConf) + "");
    setGroundsAmount(
      calculateGroundsFromCoffee(parseInt(value), ratioConf) + ""
    );
  };

  const onWaterAmountChange = (value: string) => {
    setWaterAmount(value);
    setCoffeeAmount(calculateCoffeeFromWater(parseInt(value), ratioConf) + "");
    setGroundsAmount(
      calculateGroundsFromWater(parseInt(value), ratioConf) + ""
    );
  };

  const onGroundsAmountChange = (value: string) => {
    setGroundsAmount(value);

    setCoffeeAmount(
      calculateCoffeeFromGrounds(parseInt(value), ratioConf) + ""
    );
    setWaterAmount(calculateWaterFromGrounds(parseInt(value), ratioConf) + "");
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
      />

      <LabeledInput
        id={"coffeeAmount"}
        label={"Coffee"}
        type={"text"}
        value={coffeeAmount}
        onChange={(e) => onCoffeeAmountChange(e.currentTarget.value)}
        pattern="[0-9]+([\.,][0-9]+)?"
      />

      <LabeledInput
        label={"Grounds"}
        id={"groundsAmount"}
        type={"text"}
        value={groundsAmount}
        onChange={(e) => onGroundsAmountChange(e.currentTarget.value)}
        pattern="[0-9]+([\.,][0-9]+)?"
      />
    </>
  );
}

export default App;
