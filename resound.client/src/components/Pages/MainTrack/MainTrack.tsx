import React, { useState, useEffect } from "react";
import TemplateList from "./TemplateList";
import AudioTrackGrid from "./TemplateGrid";
import { hideNav, viewNav } from "./HiddenNavbar";
import {
  Layout,
  Tooltip,
  Button,
  Drawer,
  Space,
  Flex,
  Spin,
  Typography,
  Tag,
} from "antd";
import BpmInput from "../../sequencer/SoundControl/chooseBPM";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../player/playSound";
import { url, filename } from "../../sequencer/SoundControl/chooseSound";
import { useParams } from "react-router-dom";
import { BpmValue } from "../../../player/playCanvas";
import axios from "axios";
import moment from "moment";

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
import SaveBtn from "./SaveBtn";

const { Header, Content, Footer } = Layout;

interface Template {
  id: number;
  name: string;
}

interface Sequencer {
  private: boolean;
}

const MainTrack: React.FC = () => {
  hideNav();

  const { sequencer } = useParams<{ sequencer: string }>();

  const [sequencerData, setSequencerData] = useState<Sequencer | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(sequencerData);
  const [templates, setTemplates] = useState([]);

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

  useEffect(() => {
    const fetchTemplates = async () => {
      console.log("er");
      if (sequencerData) {
        const response = await axios.get(
          `https://localhost:7262/api/Sequencers/templates?idsequencer=` +
            sequencerData.idSequencer
        );
        setTemplates(response.data);
      }
    };
    fetchTemplates();
  }, [sequencerData]);

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

  const handleChangeTemplate = (selectedTemplate) => {
    console.log(selectedTemplate);
    setSelectedTemplate(selectedTemplate);
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
    <>
      {loading ? (
        <Spin size="large" fullscreen></Spin>
      ) : (
        <div style={{ height: "100vh" }}>
          <Drawer
            title="Файл"
            placement="left"
            onClose={onClose}
            open={openDrawer}
          >
            <Space direction="vertical">
              {sequencerData.private ? (
                <>
                  <Tag color="blue">Приватный</Tag>
                </>
              ) : (
                <>
                  <Tag color="blue">Публичный</Tag>
                </>
              )}

              <h2>{sequencerData.name}</h2>
              <Typography.Text>
                Дата создания:{" "}
                {moment(sequencerData.created).format("DD MMMM YYYY HH:mm")}
              </Typography.Text>
              <Flex vertical gap="small" style={{ width: "300px" }}>
                <SaveBtn
                  idSequencer={sequencerData.idSequencer}
                  setLoading={setLoading}
                ></SaveBtn>
                <Button type="primary" onClick={closePage}>
                  Выйти
                </Button>
              </Flex>
            </Space>
          </Drawer>
          <Layout className="MainLayout">
            <Header className="header">
              <Flex gap="middle">
                <Button type="primary" onClick={showDrawer}>
                  Файл
                </Button>
                <BpmInput></BpmInput>
              </Flex>
              <Typography.Text
                style={{
                  position: "absolute",
                  right: "0",
                  padding: "20px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Проект:{" "}
                <Tag color="blue" style={{ fontSize: "15px" }}>
                  {sequencerData.name}
                </Tag>
              </Typography.Text>
            </Header>
            <div
              style={{
                display: "flex",
                marginTop: "40px",
                backgroundColor: "lightgray",
              }}
            >
              <div style={{ flex: 1, marginLeft: "10px" }}>
                <TemplateList
                  templates={templates}
                  onCreateTemplate={handleCreateTemplate}
                  idsequencer={sequencerData.idSequencer}
                  setTemplates={setTemplates}
                  onChangeSelectTemplate={handleChangeTemplate}
                />
              </div>
              <div
                style={{
                  flex: 2,
                  marginLeft: "20px",
                  marginRight: "10px",
                }}
              >
                <AudioTrackGrid
                  idSequencer={sequencer}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>
          </Layout>
          <BaseUrl url={url} filename={filename}></BaseUrl>
        </div>
      )}
    </>
  );
};

export default MainTrack;
