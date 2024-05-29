import * as Tone from "tone";
import { sampler } from "../../../player/playSound";

import GetNotes from "../../../player/Notes";
import axios from "axios";
import { url } from "inspector";
import localforage from "localforage";
export function PublicationTrack(
  m: boolean[][],
  fileNameSound: string,
  num: number
) {
  const notes: string[] = GetNotes();
  let notesplay: { [key: number]: string[] } = {};
  const recorder = new Tone.Recorder();

  // const uploadAudio = async (blob: Blob, idsequencer: string) => {
  //   const formData = new FormData();
  //   formData.append("audioFile", blob);
  //   formData.append("idsequencer", idsequencer);
  //   console.log(blob);
  //   const response = await axios.post(
  //     "https://localhost:7262/Users/upload-audio",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  // };

  const sampler = new Tone.Sampler({
    urls: {
      C4: fileNameSound,
    },
    release: 1,
    baseUrl: "https://localhost:7262/audio/",
  }).toDestination();
  // sampler.add("C4", fileNameSound);
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

    const blob = new Blob([recording], { type: "audio/mpeg" });
    console.log(num);
    const newblob: string = "blob" + num;
    await localforage.setItem(newblob, blob);

    // const url = URL.createObjectURL(blob);

    // const anchor = document.createElement("a");
    // anchor.download = "recording.mp3";
    // anchor.href = url;
    // anchor.click();
    // if (localStorage.getItem("sequencerid")) {
    //   uploadAudio(blob, localStorage.getItem("sequencerid")!);
    // }
  }, (m[0].length * 1000) / (Tone.Transport.bpm.value / 60) / 2);
}
