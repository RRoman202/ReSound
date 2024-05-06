import React, { useState, useEffect } from "react";
import VolumeSlider from "../../sequencer/SoundControl/VolumeSoundControl";
import ModalChooseSound from "../../sequencer/SoundControl/Modals/ModalChooseSound";
import BpmInput from "../../sequencer/SoundControl/chooseBPM";
import CanvasTimeSignature from "../../sequencer/ui/TimeSignatureBar";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import { useParams } from "react-router-dom";
import { ClearCanv } from "../../Canvas/ClearCanvasBtn";
import { RecordCanvas } from "../../sequencer/SoundControl/SaveAudio";
import "../../sequencer/SoundControl/SaveAudio";
import PianoTiles from "../../sequencer/ui/PianoTiles";
import { observer } from "mobx-react";
import Getnotes from "../../../player/Notes";
import { m } from "../../../player/playCanvas";
import * as Tone from "tone";
import SaveTemplateNotes from "./saveTemplate";
import LoadTemplateNotes, { LoadTempCols } from "./loadTemplate";
import { PlayCanv } from "../../../player/playCanvas";
import "../../sequencer/SoundControl/SaveAudio";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Piano.css";
import { url, filename } from "../../sequencer/SoundControl/chooseSound";
import { backDown, backUp } from "../../sequencer/Helpers/scrollFunction";
import "../../../handlers/keyboardHandler";
import {
  Row,
  Layout,
  Tooltip,
  Radio,
  Spin,
  Dropdown,
  Drawer,
  Space,
  Flex,
} from "antd";
import axios from "axios";

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
  const navigate = useNavigate();
  const { template } = useParams<{ template: string }>();
  const [templateData, setTemplateData] = useState<Template | null>(null);

  const [loadingsBtn, setLoadingsBtn] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const closePage = () => {
    isPlaying = false;
    stopMovingBar();
    navigate(`/maintrack/${localStorage.getItem("sequencerid")}`);
  };
  console.log(templateData);
  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await axios.get(
        `https://localhost:7262/api/Sequencers/template?id=${template}`
      );
      setTemplateData(response.data);
      try {
        const data = JSON.parse(templateData.notes);

        loadCols(data.cols);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTemplate();
  }, [template]);
  useEffect(() => {
    try {
      const data = JSON.parse(templateData.notes);

      loadCols(data.cols);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [templateData]);
  const [loading, setLoading] = useState(true);
  const [cols, setCols] = useState(48);
  const [widthTime, setWidthTime] = useState(1920);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);
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

  const updateTemplateNotes = async (newNotes: boolean[][]) => {
    const data = { notes: newNotes, cols };
    const blob = JSON.stringify(data);
    try {
      const response = await axios.patch(
        `https://localhost:7262/api/Sequencers/template`,
        {
          IdTemplate: templateData.idTemplate,
          Name: templateData.name,
          Volume: templateData.volume,
          notes: blob, // Update notes
          IdSound: templateData.idSound,
        }
      );
      setLoadingsBtn(true);
      setTimeout(() => {
        setLoadingsBtn(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating template notes:", error);
    }
  };

  if (!templateData) {
    return <Spin size="large" fullscreen></Spin>; // Display loading message while data is fetched
  }

  return (
    <>
      <Drawer
        title="Файл шаблона"
        placement="left"
        onClose={onClose}
        open={openDrawer}
      >
        <Space direction="vertical">
          <h2>{templateData.name}</h2>
          <Flex vertical gap="small" style={{ width: "300px" }}>
            <Button
              type="primary"
              onClick={() => updateTemplateNotes(m)}
              loading={loadingsBtn}
            >
              <a onClick={() => updateTemplateNotes(m)}>Сохранить</a>
            </Button>

            <SaveTemplateNotes cols={cols}></SaveTemplateNotes>

            <Button type="primary">Экспорт</Button>
            <Button type="primary" onClick={closePage}>
              Назад
            </Button>
          </Flex>
        </Space>
      </Drawer>
      <Layout className="layoutPiano">
        <Header className="header">
          <Flex gap="middle" align="start">
            <Flex
              style={{ width: "100%" }}
              justify="space-between"
              align="flex-start"
              gap="middle"
            >
              <Button type="primary" onClick={showDrawer}>
                Файл шаблона
              </Button>
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

              {/* <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">
                    <a onClick={() => updateTemplateNotes(m)}>Сохранить</a>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <SaveTemplateNotes cols={cols}></SaveTemplateNotes>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button style={{ marginLeft: "20px" }}>Сохранение</Button>
            </Dropdown> */}

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
            </Flex>
          </Flex>
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
                      matrix={templateData.notes}
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
          {/* <div>
            <Tooltip title="Вниз" className="btnUp">
              <Button
                icon={<CaretDownOutlined />}
                type="primary"
                onClick={backDown}
              />
            </Tooltip>
            <Tooltip title="Вверх">
              <Button
                icon={<CaretUpOutlined />}
                type="primary"
                onClick={backUp}
              />
            </Tooltip>
          </div> */}

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
                    Tone.start();
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
