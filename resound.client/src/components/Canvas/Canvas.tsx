import React, { useState, useRef, useEffect } from "react";
import Getnotes from "../../player/Notes";
import { Sound, SoundRemove } from "../../handlers/btnClickPianoRoll";
import { Matrix } from "../../player/playCanvas";
import { Canv } from "./ClearCanvasBtn";
import findNote from "./TextNoteCanvas";
import { LoadTemp } from "../../components/Pages/Sequencer/loadTemplate";
import { stringToBooleanArray } from "./StrToBoolArray";

interface GridCanvasProps {
  rows: number;
  cols: number;
  cellSize: number;
  matrix: string;
}

const notes = Getnotes();

export const GridCanvas: React.FC<GridCanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<boolean[][]>(() => {
    const rows = Array.from({ length: props.rows }, () =>
      Array.from({ length: props.cols }, () => false)
    );
    return rows;
  });

  const [visibleGrid, setVisibleGrid] = useState<boolean[][]>([]);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedCell, setDraggedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  function ClearCanvas() {
    const newGrid = Array.from({ length: props.rows }, () =>
      Array.from({ length: props.cols }, () => false)
    );
    setGrid(newGrid);
    setVisibleGrid(newGrid);
  }

  function drawCells() {
    const canvas = canvasRef.current;

    const ctx = canvas!.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.fillStyle = "#2D2E2E";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      for (let row = 0; row < visibleGrid.length; row++) {
        for (let col = 0; col < visibleGrid[row].length; col++) {
          if (notes[row].includes("#")) {
            ctx.fillStyle = "#2e3e48";
            ctx.fillRect(
              col * props.cellSize,
              row * props.cellSize,
              props.cellSize,
              props.cellSize
            );
          } else {
            ctx.fillStyle = "#34444e";
            ctx.fillRect(
              col * props.cellSize,
              row * props.cellSize,
              props.cellSize,
              props.cellSize
            );
          }
        }
      }

      for (let row = 0; row < visibleGrid.length; row++) {
        for (let col = 0; col < visibleGrid[row].length; col++) {
          if (grid[row][col]) {
            ctx.fillStyle = "lightblue";

            //canvas!.style.cursor = "pointer";
            ctx.fillRect(
              col * props.cellSize,
              row * props.cellSize,
              props.cellSize,
              props.cellSize
            );
            ctx.fillStyle = "black";

            ctx.imageSmoothingEnabled = false;
            ctx.fillText(
              findNote(row),
              col * props.cellSize + 2,
              row * props.cellSize + 10
            );
          }
          ctx.strokeStyle = "#293943";
          ctx.strokeRect(
            col * props.cellSize,
            row * props.cellSize,
            props.cellSize,
            props.cellSize
          );
        }
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas!.getBoundingClientRect();
    const visibleRows = Math.ceil(rect.height / props.cellSize);
    const visibleCols = Math.ceil(rect.width / props.cellSize);
    const startRow = Math.floor(window.scrollY / props.cellSize);
    const startCol = Math.floor(rect.left / props.cellSize);

    const newVisibleGrid: boolean[][] = [];
    for (let row = startRow; row < startRow + visibleRows; row++) {
      const newRow: boolean[] = [];
      for (let col = startCol; col < startCol + visibleCols; col++) {
        if (row < props.rows && col < props.cols) {
          newRow.push(grid[row][col]);
        } else {
          newRow.push(false);
        }
      }
      newVisibleGrid.push(newRow);
    }

    setVisibleGrid(newVisibleGrid);
  }, [props.rows, props.cols, props.cellSize]);

  useEffect(() => {
    drawCells();
    console.log(grid);
  }, [visibleGrid]);

  useEffect(() => {
    if (props.matrix) {
      try {
        const data = JSON.parse(props.matrix);
        console.log(data);
        setGrid(data.notes);
      } catch (e) {
        console.log(e);
      }
    }
  }, [props.matrix]);

  function handleClick(row: number, col: number) {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
    drawCells();
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isDragging && draggedCell) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / props.cellSize);
      const y = Math.floor((e.clientY - rect.top) / props.cellSize);
      if (x !== draggedCell.col || y !== draggedCell.row) {
        const newGrid = [...grid];
        newGrid[y][x] = true;
        newGrid[draggedCell.row][draggedCell.col] = false;
        Sound(notes[y]);
        SoundRemove();
        setGrid(newGrid);
        setDraggedCell({ row: y, col: x });
        drawCells();
      }
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
    setDraggedCell(null);
    drawCells();
  }

  function loadTemplate(newNotes: boolean[][]) {
    ClearCanvas();
    setGrid(newNotes);
    console.log(newNotes);
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={props.cols * props.cellSize}
        height={props.rows * props.cellSize}
        onMouseDown={(e) => {
          const rect = canvasRef.current!.getBoundingClientRect();
          const x = Math.floor((e.clientX - rect.left) / props.cellSize);
          const y = Math.floor((e.clientY - rect.top) / props.cellSize);
          Sound(notes[y]);
          handleClick(y, x);
          setIsDragging(true);
          setDraggedCell({ row: y, col: x });
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={(e) => {
          SoundRemove();
          handleMouseUp();
        }}
      />
      <Canv ClearCanvass={ClearCanvas}></Canv>
      <Matrix grid={grid}></Matrix>
      <LoadTemp loadTemplate={loadTemplate}></LoadTemp>
    </div>
  );
};
