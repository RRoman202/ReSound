import React from "react";
interface ClearCanvasProps {
  ClearCanvass: () => void;
}
let ClearCanvasAll: () => void;
export const Canv: React.FC<ClearCanvasProps> = ({ ClearCanvass }) => {
  ClearCanvasAll = { ClearCanvass }.ClearCanvass;
  return null;
};
export const ClearCanv = () => {
  return ClearCanvasAll();
};
