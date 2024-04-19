import React, { useRef, useEffect, useState } from "react";

interface CanvasProps {
  width: number;
  height: number;
  spacing: number;
}

interface ChangePositionProps {
  changePosition: (position: number) => void;
}

let changePosition123: (position: number) => void;

export const ChangePos: React.FC<ChangePositionProps> = ({
  changePosition,
}) => {
  changePosition123 = { changePosition }.changePosition;

  return null;
};

const CanvasTimeSignature: React.FC<CanvasProps> = ({
  width,
  height,
  spacing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, width, height);
        context.imageSmoothingEnabled = true;

        let x = spacing;
        const y = height / 2;
        let num = 1;

        context.fillStyle = "white";
        while (x < width - spacing + 300) {
          context.fillText(num.toString(), x - 155, y);
          context.fillRect(x, y, 1, 30);
          num++;
          x += spacing;
        }
      }

      canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;

        let newPosition = -1;
        for (let i = 0; i < (width / spacing) * 4; i++) {
          if (mouseX < (spacing / 4) * (i + 1)) {
            newPosition = i;
            break;
          }
        }

        if (newPosition !== position) {
          setPosition(newPosition);
          changePosition123(newPosition);
        }
      });
    }
  }, [position, spacing, width, height]);

  return (
    <div className="signature">
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default CanvasTimeSignature;
