import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TemplateList from "./TemplateList";
import AudioTrackGrid from "./TemplateGrid";
import { hideNav, viewNav } from "./HiddenNavbar";
import { Layout, Tooltip, Button, Drawer, Space, Flex, Spin } from "antd";
import BpmInput from "../../sequencer/SoundControl/chooseBPM";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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

import "./MainTrack.css";

const { Header, Content, Footer } = Layout;

interface Template {
  id: number;
  name: string;
}

const MainTrack: React.FC = () => {
  hideNav();
  console.log(useParams());
  const { sequencer } = useParams<{ sequencer: string }>();

  const [sequencerData, setSequencerData] = useState<Sequencer | null>(null);
  console.log(sequencerData);

  useEffect(() => {
    const fetchSequencer = async () => {
      const response = await axios.get(
        `https://localhost:7262/api/Sequencers/${sequencer}?iduser=` +
          localStorage.getItem("userid")
      );
      setSequencerData(response.data);
    };
    fetchSequencer();
  }, [sequencer]);
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, name: "Шаблон 1" },
    { id: 2, name: "Шаблон 2" },
    { id: 3, name: "Шаблон 3" },
  ]);

  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const closePage = () => {
    navigate("/home");
    viewNav();
  };

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: templates.length + 1,
      name: `Шаблон ${templates.length + 1}`,
    };
    setTemplates([...templates, newTemplate]);
  };

  if (!sequencerData) {
    return <Spin size="large" fullscreen></Spin>; // Display loading message while data is fetched
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Drawer title="Файл" placement="left" onClose={onClose} open={openDrawer}>
        <Space direction="vertical">
          <h2>{sequencerData.name}</h2>
          <Flex vertical gap="small" style={{ width: "300px" }}>
            <Button type="primary">Сохранить</Button>
            <Button type="primary">Сохранить как</Button>
            <Button type="primary">Экспорт</Button>
            <Button type="primary" onClick={closePage}>
              Выйти
            </Button>
          </Flex>
        </Space>
      </Drawer>
      <Layout className="MainLayout">
        <Header className="header">
          <Button type="primary" onClick={showDrawer}>
            Файл
          </Button>
          <BpmInput></BpmInput>
        </Header>
        <div style={{ display: "flex", marginTop: "40px" }}>
          <div style={{ flex: 1, marginLeft: "10px" }}>
            <TemplateList
              templates={templates}
              onCreateTemplate={handleCreateTemplate}
            />
          </div>
          <div style={{ flex: 2, marginLeft: "20px", marginRight: "10px" }}>
            <AudioTrackGrid />
          </div>
        </div>
        <Footer className="footer">
          <div className="play-btn">
            <Tooltip title="Пауза">
              <Button
                type="primary"
                shape="circle"
                className="pause-button"
                icon={<PauseCircleOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Пуск">
              <Button
                type="primary"
                shape="circle"
                className="play-button"
                icon={<CaretRightOutlined />}
              ></Button>
            </Tooltip>
            <Tooltip title="Стоп">
              <Button
                type="primary"
                shape="circle"
                icon={<BorderOutlined />}
              ></Button>
            </Tooltip>
          </div>
        </Footer>
      </Layout>
    </DndProvider>
  );
};

export default MainTrack;
