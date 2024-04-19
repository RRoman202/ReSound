import React, { useState } from "react";
import { Slider } from "antd";
import { PanValue } from "../../../player/playSound";

const PannerSlider = () => {
  const [pan, setPan] = useState(0);
  const handlePanChange = (value: number) => {
    setPan(value);
  };

  return (
    <div className="panner-div">
      <Slider
        className="slider-panner"
        trackStyle={{ backgroundColor: "white" }}
        railStyle={{ backgroundColor: "blue" }}
        min={-1}
        max={1}
        step={0.1}
        value={pan}
        onChange={handlePanChange}
      />
      <PanValue pan={pan}></PanValue>
    </div>
  );
};

export default PannerSlider;
