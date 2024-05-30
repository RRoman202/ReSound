import { useState, useEffect } from "react";
import axios from "axios";
import localforage from "localforage";
import Crunker from "crunker";
import * as Tone from "tone";
import { PublicationTrack } from "../MainTrack/PublicationTrack";
import { Button, Spin, message } from "antd";

interface PublicProps {
  idSequencer: string;
  setLoading: (a: boolean) => void;
}

const PublicButton: React.FC<PublicProps> = ({ idSequencer, setLoading }) => {
  const [tracks, setTracks] = useState([]);
  const [templatestrack, setTemplatestrack] = useState([]);
  const [checkCover, setCheckCover] = useState(null);

  const fetchTracks = async () => {
    const response = await axios.get(
      `https://localhost:7262/Tracks/seq-track?idsequencer=` + idSequencer
    );
    setTracks(response.data);
    console.log(response.data);
  };

  const FetchTemplatesTracks = async () => {
    const response = await axios.get(
      `https://localhost:7262/Tracks/track-template?idsequencer=` + idSequencer
    );
    setTemplatestrack(response.data);
    fetchTracks();
  };
  const fetchCheckCover = async () => {
    const response = await axios.get(
      `https://localhost:7262/Tracks/checkcover?idsequencer=` + idSequencer
    );
    setCheckCover(response.data);
  };
  const mergeBlobs = async (maxBlobs: number) => {
    const formData = new FormData();
    const blobs: Blob[] = [];
    const urls: string[] = [];
    const audioBuffers = [];

    const audioContext = new AudioContext();

    for (let i = 0; i < maxBlobs; i++) {
      blobs.push(await localforage.getItem("blob" + i));
      const url = URL.createObjectURL(await localforage.getItem("blob" + i));
      urls.push(url);
    }
    for (const url of urls) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      audioBuffers.push(audioBuffer);
    }
    const crunker = new Crunker();
    console.log(audioBuffers);
    const merged = crunker.mergeAudio(audioBuffers);
    const output = crunker.export(merged, "audio/wav");
    console.log(output);

    const mergedBlob: Blob = new Blob([output.blob]);

    // const url = URL.createObjectURL(mergedBlob);

    // const anchor = document.createElement("a");
    // anchor.download = "recording.wav";
    // anchor.href = url;
    // anchor.click();
    formData.append("audioFile", mergedBlob);
    formData.append("idsequencer", idSequencer);

    const response = await axios.post(
      "https://localhost:7262/Users/upload-audio",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    localforage
      .clear()
      .then(function () {
        console.log("Database is now empty.");
      })
      .catch(function (err) {
        console.log(err);
      });
    setLoading(false);
  };

  const publicTrack = async () => {
    let k = 0;
    Tone.start();
    setLoading(true);

    tracks.forEach(async (track, i) => {
      const trackTemplates = templatestrack.filter(
        (t) => t.idTrack === track.idTrack
      );

      const playtemplates = trackTemplates.filter(
        (t) => t.positionTemplate === k
      );

      playtemplates.forEach(async (template) => {
        const notes = JSON.parse(template.template.notes);
        const response = await axios.get(
          `https://localhost:7262/Tracks/sound?idsound=${template.template.idSound}`
        );

        const fileNameSound = response.data.fileName;
        PublicationTrack(notes.notes, fileNameSound, i);

        setTimeout(async () => {
          localforage
            .length()
            .then(function (numberOfKeys) {
              console.log(numberOfKeys);
              mergeBlobs(numberOfKeys);
            })
            .catch(function (err) {
              console.log(err);
            });
        }, (notes.notes.length * 1000) / (Tone.Transport.bpm.value / 60) / 2);
      });
    });
  };
  const [mes, contextHolder] = message.useMessage();

  const error = () => {
    mes.open({
      type: "error",
      content: "Перед публикацией загрузите обложку",
    });
  };

  useEffect(() => {
    fetchTracks();
    FetchTemplatesTracks();
    fetchCheckCover();
  }, []);
  return (
    <>
      {contextHolder}
      <div
        onClick={() => {
          if (checkCover) {
            console.log(checkCover);
            publicTrack();
          } else {
            error();
          }
        }}
      >
        Опубликовать
      </div>
    </>
  );
};

export default PublicButton;
