import React, { useState } from "react";
import { InputNumber } from "antd";
import { BpmValue } from "../../../player/playCanvas";

const BpmInput = () => {
  const [bpm, setBpm] = useState<number>(120);
  const handleBpmChange = (value: number | null) => {
    if (value !== 0) {
      setBpm(value!);
    }
  };
  return (
    <>
      <InputNumber
        className="bpm-input"
        min={10}
        max={522}
        defaultValue={120}
        step="0.001"
        onChange={handleBpmChange}
        addonAfter="BPM"
      />
      <BpmValue bpmvalue={bpm}></BpmValue>
    </>
  );
};

export default BpmInput;
