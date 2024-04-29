import * as Tone from "tone";
import { sampler } from "../../../player/playSound";
import { m } from "../../../player/playCanvas";
import GetNotes from "../../../player/Notes";
import { Button, Input } from "antd";
import { useState, useEffect } from "react";

interface LoadTempalteProps {
  loadTemplate: (notes: boolean[][]) => void;
}

interface LoadTempalteColsProps {
  loadTemplateCols: (cols: number) => void;
}

let loadTempalteNotes: (notes: boolean[][]) => void;

let loadTempalteCol: (cols: number) => void;

export const LoadTemp: React.FC<LoadTempalteProps> = ({ loadTemplate }) => {
  loadTempalteNotes = { loadTemplate }.loadTemplate;

  return null;
};

export const LoadTempCols: React.FC<LoadTempalteColsProps> = ({
  loadTemplateCols,
}) => {
  loadTempalteCol = { loadTemplateCols }.loadTemplateCols;

  return null;
};

export default function LoadTemplateNotes() {
  const [notes, setNotes] = useState<boolean[][] | null>(null);
  const [cols, setCols] = useState<number | null>(null);

  const loadNotes = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          setNotes(data.notes);
          setCols(data.cols);
          loadTempalteCol(data.cols);
          loadTempalteNotes(data.notes);

          resolve(data.notes);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
      reader.readAsText(file);
    });
  };

  useEffect(() => {
    if (cols !== null) {
      if (notes) loadTempalteNotes(notes); // Update notes only after cols is set
    }
  }, [notes, cols]);

  return (
    <Button className="load-btn">
      <input
        type="file"
        onChange={(e) => e.target.files?.length && loadNotes(e.target.files[0])}
        accept=".resound"
      />
    </Button>
  );
}
