import React, { useState, useEffect } from "react";
import VolumeSlider from "../../sequencer/SoundControl/VolumeSoundControl";
import ModalChooseSound from "../../sequencer/SoundControl/Modals/ModalChooseSound";
import BpmInput from "../../sequencer/SoundControl/chooseBPM";
import CanvasTimeSignature from "../../sequencer/ui/TimeSignatureBar";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import { ClearCanv } from "../../Canvas/ClearCanvasBtn";
import { RecordCanvas } from "../../sequencer/SoundControl/SaveAudio";
import "../../sequencer/SoundControl/SaveAudio";
import PianoTiles from "../../sequencer/ui/PianoTiles";
import { observer } from "mobx-react";
import Getnotes from "../../../player/Notes";
import SaveTemplateNotes from "./saveTemplate";
import LoadTemplateNotes, { LoadTempCols } from "./loadTemplate";
import { PlayCanv } from "../../../player/playCanvas";
import "../../sequencer/SoundControl/SaveAudio";
import { Button } from "antd";
import "./Piano.css";
import { url, filename } from "../../sequencer/SoundControl/chooseSound";
import { backDown, backUp } from "../../sequencer/Helpers/scrollFunction";
import "../../../handlers/keyboardHandler";
import { Row, Layout, Tooltip, Radio, Spin } from "antd";

import {
  CaretUpOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  SoundTwoTone,
  BorderOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { GridCanvas } from "../../Canvas/Canvas";
import { BaseUrl } from "../../../player/playSound";
const notes = Getnotes();
let isPlaying = false;
const { Header, Content, Footer } = Layout;
interface ProgressBarProps {
  handleStartMoving: () => void;
  stopMoving: () => void;
  pauseMoving: () => void;
}

let startProgressBar: () => void;
let stopMovingBar: () => void;
let pauseMovingBar: () => void;
export const Prog: React.FC<ProgressBarProps> = ({
  handleStartMoving,
  stopMoving,
  pauseMoving,
}) => {
  startProgressBar = { handleStartMoving }.handleStartMoving;
  stopMovingBar = { stopMoving }.stopMoving;
  pauseMovingBar = { pauseMoving }.pauseMoving;
  return null;
};
const Piano = observer(() => {
  hideNav();
  const [loading, setLoading] = useState(true);
  const [cols, setCols] = useState(48);
  const [widthTime, setWidthTime] = useState(1920);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="spinner-container">
        <Spin size="large" />
      </div>
    );
  }

  const addCols = () => {
    setCols(cols + 48); // Увеличиваем количество колонок на 48
    setWidthTime(widthTime + 1920);
  };

  function loadCols(newCols: number) {
    setCols(newCols);
    setWidthTime(newCols * 40);
  }

  return (
    <>
      <Layout className="layoutPiano">
        <Header className="header">
          <div className="divMenuPiano">
            <Tooltip title="Вверх" className="btnUp">
              <Button
                icon={<CaretUpOutlined />}
                type="primary"
                onClick={backUp}
              />
            </Tooltip>
            <ModalChooseSound></ModalChooseSound>
            <BpmInput></BpmInput>
            <Button
              onClick={RecordCanvas}
              type="primary"
              className="record-button"
            >
              Записать
            </Button>
            <Tooltip title="Очистить">
              <Button
                className="delete-button"
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={ClearCanv}
              ></Button>
            </Tooltip>

            <SaveTemplateNotes cols={cols}></SaveTemplateNotes>
            <LoadTemplateNotes></LoadTemplateNotes>
            <Radio.Group
              defaultValue="a"
              buttonStyle="solid"
              className="pencil-button"
            >
              <Radio.Button value="a">
                <Tooltip title="Карандаш">
                  <EditOutlined></EditOutlined>
                </Tooltip>
              </Radio.Button>
              <Radio.Button value="b">
                <Tooltip title="Выделение">
                  <RadiusUprightOutlined />
                </Tooltip>
              </Radio.Button>
            </Radio.Group>

            <SoundTwoTone className="soundicon" />
            <VolumeSlider></VolumeSlider>
          </div>
        </Header>
        <Content id="contentLayout" className="contentLayout">
          <div className="pianoDiv">
            <Row
              style={{
                flexWrap: "nowrap",
              }}
            >
              <PianoTiles></PianoTiles>
              <div>
                <CanvasTimeSignature
                  width={widthTime}
                  height={15}
                  spacing={160}
                ></CanvasTimeSignature>
                <div className="grid-canvas">
                  <PlayCanv></PlayCanv>

                  <div>
                    <GridCanvas
                      rows={notes.length}
                      cols={cols}
                      cellSize={40}
                      key={cols}
                    ></GridCanvas>
                  </div>
                </div>
              </div>
              <Button
                className="addColsButton"
                onClick={addCols}
                type="primary"
                icon={<PlusOutlined />}
                size="large"
              ></Button>
            </Row>
          </div>
        </Content>
        <Footer className="footer">
          <Tooltip title="Вниз" className="btnUp">
            <Button
              icon={<CaretDownOutlined />}
              type="primary"
              onClick={backDown}
            />
          </Tooltip>
          <div className="play-btn">
            <Tooltip title="Пауза">
              <Button
                onClick={() => {
                  isPlaying = false;
                  pauseMovingBar();
                }}
                type="primary"
                shape="circle"
                className="pause-button"
                icon={<PauseCircleOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Пуск">
              <Button
                onClick={() => {
                  if (!isPlaying) {
                    isPlaying = true;
                    startProgressBar();
                  }
                }}
                type="primary"
                shape="circle"
                className="play-button"
                icon={<CaretRightOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Стоп">
              <Button
                onClick={() => {
                  isPlaying = false;
                  stopMovingBar();
                }}
                type="primary"
                shape="circle"
                icon={<BorderOutlined />}
              ></Button>
            </Tooltip>
          </div>
        </Footer>
      </Layout>
      <BaseUrl url={url} filename={filename}></BaseUrl>
      <LoadTempCols loadTemplateCols={loadCols}></LoadTempCols>
    </>
  );
});

export default Piano;
