import Getnotes from "../../player/Notes";

const notes: string[] = Getnotes();

function findNote(row: number) {
  return notes[row];
}

export default findNote;
