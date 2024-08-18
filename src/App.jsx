import { useState } from "react";
import Button from "./components/Botton";
import ButtonBox from "./components/ButtonBox";
import Screen from "./components/Screen";
import Wrapper from "./components/Wrapper";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const math = (a, b, sign) =>
  sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

const zeroDivisionError = "Can't divide with 0";

function App() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // numClickHandler function
  const numClickHandler = (e) => {
    console.log(e);
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num.length) < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === 0
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(calc.num + value))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  // commaClickHandler function
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // signClickHandler function
  const signClickHandler = (e) => {
    setCalc({
      ...calc,
      sign: e.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    });
  };

  // equalsClickHandler function
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? zeroDivisionError
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  // invertClickHandler function
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num)) * -1 : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res)) * -1 : 0,
      sign: "",
    });
  };

  // percentClickHandler function
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc({
      ...calc,
      num: (num * 10 ** 16) / 10 ** 18,
      res: (res * 10 ** 16) / 10 ** 18,
      sign: "",
    });
  };

  // resetClickHandler function
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const buttonClickHandler = (e, btn) => {
    btn === "C" || calc.res === zeroDivisionError
      ? resetClickHandler()
      : btn === "+-"
      ? invertClickHandler()
      : btn === "%"
      ? percentClickHandler()
      : btn === "="
      ? equalsClickHandler()
      : btn === "/" || btn === "X" || btn === "-" || btn === "+"
      ? signClickHandler(e)
      : btn === "."
      ? commaClickHandler(e)
      : numClickHandler(e);
  };
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equal" : ""}
              value={btn}
              onClick={(e) => {
                buttonClickHandler(e, btn);
              }}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
