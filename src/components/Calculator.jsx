import Button from "./Botton";
import ButtonBox from "./ButtonBox";
import Screen from "./Screen";
import Wrapper from "./Wrapper";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
const Calculator = () => {
  return (
    <Wrapper>
      <Screen value="0" />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equal" : ""}
              value={btn}
              onClick={() => {
                console.log(`${btn} clicked!`);
              }}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default Calculator;
