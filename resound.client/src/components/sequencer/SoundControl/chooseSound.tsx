import React, { useState, useEffect } from "react";
import { Button } from "antd";
import * as Tone from "tone";
import { getSounds } from "./FetchData/GetSounds";

export let url: string = "https://localhost:7262/audio/";
export let filename: string = "piano.mp3";

function playExample(url: string, filename: string) {
  const player = new Tone.Player(url + filename).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
}
function ChooseSoundFunction() {
  const [sounds, setSounds] = useState([]);

  const ChooseSound = (sound: string) => {
    if (sound) {
      url = "https://localhost:7262/audio/";
      filename = sound;
      playExample(url, sound);
    } else {
      console.warn(`Sound "${sound}" is invalid or missing a filename.`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSounds();
        setSounds(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {sounds.map((sound: string) => (
        <p key={sound}>
          <Button type="primary" onClick={() => ChooseSound(sound)}>
            {sound}
          </Button>
        </p>
      ))}
    </>
  );
}

export default ChooseSoundFunction;
