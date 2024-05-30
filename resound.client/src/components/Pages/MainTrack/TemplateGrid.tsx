import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Layout,
  Radio,
  Space,
  Tooltip,
  Dropdown,
  Menu,
  Typography,
} from "antd";
import { useDrop } from "react-dnd";
import Crunker from "crunker";
import { createBlob, blobToArrayBuffer, arrayBufferToBlob } from "blob-util";
import { ItemTypes } from "./ItemTypes";
import "./MainTrack.css";
import CanvasTimeSignature from "../../sequencer/ui/TimeSignatureBar";
import { EditOutlined, RadiusUprightOutlined } from "@ant-design/icons";
import { PlayTracks } from "./PlayTracks";
import { PublicationTrack } from "./PublicationTrack";
import * as Tone from "tone";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";
import {
  CaretUpOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  SoundTwoTone,
  BorderOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import localforage from "localforage";
const { Header, Content, Footer } = Layout;

interface Template {
  id: number;
  name: string;
}

interface TemplateListProps {
  selectedTemplate: Template;
  idSequencer: string;
}

const AudioTrackGrid: React.FC<TemplateListProps> = ({
  selectedTemplate,
  idSequencer,
}) => {
  const [tracks, setTracks] = useState([]);
  const [templatestrack, setTemplatestrack] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);

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

  const addTracks = async () => {
    const response = await axios.post(
      `https://localhost:7262/Tracks/seq-track?idsequencer=` + idSequencer
    );
    fetchTracks();
    FetchTemplatesTracks();
  };

  const deleteTemplate = async (idTrack: string, position: number) => {
    const response = await axios.delete(
      `https://localhost:7262/Tracks/track-template?idtrack=` +
        idTrack +
        `&position=` +
        position
    );
    fetchTracks();
    FetchTemplatesTracks();
  };

  const deleteTrack = async (idTrack: string) => {
    const response = await axios.delete(
      `https://localhost:7262/Tracks/trackInPlaylist?idtrack=` + idTrack
    );
    fetchTracks();
    FetchTemplatesTracks();
  };

  const addTemplate = async (idTrack: string, position: number) => {
    const response = await axios.post(
      `https://localhost:7262/Tracks/track-template?idtrack=` +
        idTrack +
        `&idtemplate=` +
        selectedTemplate.idTemplate +
        `&position=` +
        position
    );
    fetchTracks();
    FetchTemplatesTracks();
  };

  const playTracks = async () => {
    // console.log(tracks);
    // console.log(templatestrack);
    Tone.start();

    let k = 0;

    tracks.forEach(async (track) => {
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

        PlayTracks(notes.notes, fileNameSound);

        setTimeout(async () => {},
        (notes.notes.length * 1000) / (Tone.Transport.bpm.value / 60) / 2);

        // console.log(template);
      });
    });
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
        // Run this code once the database has been entirely deleted.
        console.log("Database is now empty.");
      })
      .catch(function (err) {
        // This code runs if there were any errors
        console.log(err);
      });
  };

  const publicTrack = async () => {
    let k = 0;
    Tone.start();
    setIsBlocked(true);

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
          setIsBlocked(false);
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

  useEffect(() => {
    fetchTracks();
    FetchTemplatesTracks();
  }, []);

  return (
    <Card
      headStyle={{ backgroundColor: "#1677ff", color: "white" }}
      title="Плейлист"
      style={{ height: "100%" }}
      bodyStyle={{ padding: 0 }}
      className="CardGrid"
    >
      <Layout>
        <div className="headerMain"></div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr 1fr 1fr 1fr",
            gridGap: "2px",
          }}
        >
          {[...tracks].map((track, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <Dropdown
                placement="topRight"
                overlay={
                  <Menu>
                    <Menu.Item key="1" danger>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => deleteTrack(track.idTrack)}
                      >
                        Удалить
                      </a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <div
                  style={{
                    gridRow: `${rowIndex + 1}`,
                    gridColumn: "1",
                    background: "lightblue",
                    textAlign: "center",
                    padding: "8px",
                    position: "relative",
                  }}
                >
                  Дорожка {rowIndex + 1}
                </div>
              </Dropdown>

              {[...Array(1)].map((_, colIndex) => {
                const template = templatestrack.find(
                  (t) =>
                    t.idTrack === track.idTrack &&
                    t.positionTemplate === colIndex
                );

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      gridRow: `${rowIndex + 1}`,
                      gridColumn: `${colIndex + 2}`,
                      border: "1px solid #ccc",
                      height: "50px",
                      cursor: "pointer",
                      backgroundColor: template ? "lightblue" : "white",
                      textAlign: "center",
                      borderRadius: "5px",
                      position: "relative",
                    }}
                    className="GridMainTrack"
                    onClick={() => addTemplate(track.idTrack, colIndex)}
                  >
                    {template && (
                      <div>
                        <span>{template.template.name}</span>
                        <Button
                          onClick={() =>
                            deleteTemplate(track.idTrack, colIndex)
                          }
                          size="small"
                          icon={<CloseOutlined></CloseOutlined>}
                          style={{ position: "absolute", right: "0" }}
                        ></Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
          <Button type="primary" onClick={addTracks}>
            Добавить дорожку
          </Button>

          {/* {isBlocked ? (
            <>
              <Button
                type="primary"
                onClick={() => {
                  publicTrack();
                }}
              >
                Опубликовать
              </Button>
            </>
          ) : (
            <>
              <Button type="primary" onClick={() => publicTrack()}>
                Опубликовать
              </Button>
            </>
          )} */}
        </div>
      </Layout>
      <Footer className="footer-main">
        <div className="play-btn">
          <Tooltip title="Пуск">
            <Button
              icon={<CaretRightOutlined></CaretRightOutlined>}
              onClick={() => playTracks()}
              shape="circle"
              className="play-button"
            ></Button>
          </Tooltip>
          <Tooltip title="Стоп">
            <Button
              icon={<BorderOutlined></BorderOutlined>}
              shape="circle"
              onClick={() => Tone.Transport.cancel()}
            ></Button>
          </Tooltip>
        </div>
      </Footer>
    </Card>
  );
};

export default AudioTrackGrid;
