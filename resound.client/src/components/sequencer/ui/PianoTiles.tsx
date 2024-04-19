import Getnotes from "../../../player/Notes";
import { Row, Button, Col } from "antd";
import { Sound, SoundRemove } from "../../../handlers/btnClickPianoRoll";
const notes = Getnotes();

export default function PianoTiles() {
  const rows: JSX.Element[] = [];
  notes.forEach((note: string) => {
    rows.push(
      <Row key={note}>
        <Button
          className={"ant-btn-default " + keyColor(note)}
          onMouseDown={() => Sound(note)}
          onMouseUp={() => SoundRemove()}
          onMouseLeave={() => SoundRemove()}
        >
          {note}
        </Button>
      </Row>
    );
  });

  return <Col className="pianoCol">{rows}</Col>;
}
function keyColor(note: string): string {
  if (note.includes("#")) {
    return "gridBlack";
  } else {
    return "gridWhite";
  }
}
