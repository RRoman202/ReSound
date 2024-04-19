import * as Tone from "tone";
import { sampler } from "../../../player/playSound";

import { m } from "../../../player/playCanvas";
import GetNotes from "../../../player/Notes";
export function RecordCanvas() {
  const notes: string[] = GetNotes();
  let notesplay: { [key: number]: string[] } = {};
  const recorder = new Tone.Recorder();

  sampler.connect(recorder);
  let index = 0;
  function GetNotesPlay() {
    const matrix = m;
    const numRows: number = matrix.length;
    const numCols: number = matrix[0].length;
    for (let col = 0; col < numCols; col++) {
      let colnotes: string[] = [];
      for (let row = 0; row < numRows; row++) {
        if (matrix[row][col]) {
          colnotes.push(notes[row]);
        }
      }
      notesplay[col] = colnotes;
    }
  }
  function playNote() {
    const notesp = notesplay[index];

    for (let n = 0; n < notesp.length; n++) {
      sampler.triggerAttackRelease(notesp[n], "8n");
    }
    GetNotesPlay();
    index = (index + 1) % m[0].length;
  }
  GetNotesPlay();
  recorder.start();

  Tone.Transport.scheduleRepeat(playNote, "8n");
  Tone.Transport.start();

  setTimeout(async () => {
    const recording = await recorder.stop();
    Tone.Transport.cancel();
    Tone.Transport.stop();

    let blob = new Blob([recording], { type: "audio/ogg; codecs=opus" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.download = "recording.ogg";
    anchor.href = url;
    anchor.click();
  }, (m[0].length * 1000) / (Tone.Transport.bpm.value / 60) / 2);
}
