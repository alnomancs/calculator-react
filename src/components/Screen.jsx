/* eslint-disable react/prop-types */
import { Textfit } from "react-textfit";
import "/src/css/Screen.css";

const Screen = ({ value }) => {
  return (
    <Textfit className="screen" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;
