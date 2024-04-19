import { sampler } from "../player/playSound";
import * as Tone from "tone";

export function Sound(note: string): void {
  Tone.loaded().then(() => {
    sampler.triggerAttack(note);
  });
}

export function SoundRemove(): void {
  sampler.releaseAll();
}
