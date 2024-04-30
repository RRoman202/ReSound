import * as Tone from "tone";
import { sampler } from "../../../player/playSound";
import { m } from "../../../player/playCanvas";
import GetNotes from "../../../player/Notes";
import { Button } from "antd";
import { saveAs } from "file-saver";
import "./Piano.css";

export default function SaveTemplateNotes({ cols }: { cols: number }) {
  const saveNotes = () => {
    const data = { notes: m, cols };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    const filename = prompt("Введите название файла:");
    if (filename) {
      saveAs(blob, filename + ".resound");
    }
  };

  return (
    <Button type="primary" onClick={saveNotes}>
      Сохранить как
    </Button>
  );
}
