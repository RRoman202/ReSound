import { Button } from "antd";
import * as Tone from "tone";

export let url: string = "https://tonejs.github.io/audio/salamander/";
export let filename: string = "C4.mp3";

function playExample(url: string, filename: string) {
  const player = new Tone.Player(url + filename).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
}
function ChooseSoundFunction() {
  const ChooseSound = (soundname: string) => {
    switch (soundname) {
      case "arp": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "Arp_note.mp3";
        break;
      }
      case "piano": {
        url = "https://localhost:7262/audio/";
        filename = "piano.mp3";
        break;
      }
      case "bang": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "Bang_Tin_1.mp3";
        break;
      }
      case "kalimba": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "Kalimba_1.mp3";
        break;
      }
      case "guitar_chord": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "guitar_chord1.mp3";
        break;
      }
      case "guitar_chord2": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "guitar_chord2.mp3";
        break;
      }
      case "guitar_chord3": {
        url = "https://tonejs.github.io/audio/berklee/";
        filename = "guitar_chord3.mp3";
        break;
      }
      default: {
        break;
      }
    }
    playExample(url, filename);
  };

  return (
    <>
      <p>
        <Button type="primary" onClick={() => ChooseSound("piano")}>
          Piano
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("arp")}>
          Arp Synth
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("bang")}>
          Bang
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("kalimba")}>
          Kalimba
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("guitar_chord")}>
          Guitar Chord
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("guitar_chord2")}>
          Guitar Chord 2
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => ChooseSound("guitar_chord3")}>
          Guitar Chord 3
        </Button>
      </p>
    </>
  );
}

export default ChooseSoundFunction;
