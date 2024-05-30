import React from "react";
import { Button, List, Card, Slider, Dropdown, Menu } from "antd";
import { ItemTypes } from "./ItemTypes";
import { useNavigate, Link } from "react-router-dom";
import { hideNav } from "./HiddenNavbar";
import { useState } from "react";
import axios from "axios";
import "./MainTrack.css";
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
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  FormOutlined,
  LikeOutlined,
  BarChartOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ModalCreateTemplate from "./Modals/ModalCreateTemplate";
import ModalUpdateTemplate from "./Modals/ModalUpdateTemplate";

interface Template {
  id: number;
  name: string;
}

interface TemplateListProps {
  templates: Template[];
  onCreateTemplate: () => void;
  idsequencer: string;
  setTemplates: (templates: Template[]) => void;
  onChangeSelectTemplate: (template: Template) => void;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onCreateTemplate,
  idsequencer,
  setTemplates,
  onChangeSelectTemplate,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelectTemplate = async (template: Template) => {
    setSelectedTemplate(template);
    onChangeSelectTemplate(template);
    console.log(selectedTemplate);
  };

  const navigate = useNavigate();

  const createTemplate = () => {};

  const copyTemplate = async (template: any, idsequencer: string) => {
    fetch("https://localhost:7262/api/Sequencers/copy-templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        IdSound: template.idSound,
        BPM: template.bpm,
        Name: template.name,
        Notes: template.notes,
        Volume: template.volume,
        Sound: template.sound,
        IdSequencer: idsequencer,
      }),
    })
      .then((response) => {
        if (response.ok) {
          getTemplates();
        } else {
          console.error("Error");
        }
      })
      .finally(() => {});
  };

  const getTemplates = async () => {
    const response = await axios.get(
      `https://localhost:7262/api/Sequencers/templates?idsequencer=` +
        idsequencer
    );
    setTemplates(response.data);
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await axios.delete(
        `https://localhost:7262/api/Sequencers/template/${id}`
      );
      const updatedTemplates = templates.filter(
        (template) => template.idTemplate !== id
      );
      setTemplates(updatedTemplates);
    } catch (error) {
      console.error("Error deleting sequencer:", error);
    }
  };

  return (
    <Card
      headStyle={{ backgroundColor: "#1677ff", color: "white" }}
      title="Шаблоны"
      className="listTemplates"
    >
      <ModalCreateTemplate
        idsequencer={idsequencer}
        setTemplates={setTemplates}
      ></ModalCreateTemplate>
      <List
        dataSource={templates}
        renderItem={(item) => (
          <List.Item>
            <div>
              <Card
                // style={{
                //   backgroundColor: "lightblue",
                //   width: "300px",
                //   textAlign: "center",
                //   position: "relative",
                // }}
                className={
                  "template-card-" +
                  (selectedTemplate === item ? "selected" : "")
                }
                hoverable
                onClick={() => handleSelectTemplate(item)}
              >
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="1"
                        onClick={() => {
                          hideNav();
                          navigate(`/piano/${item.idTemplate}`);
                        }}
                      >
                        Открыть
                      </Menu.Item>
                      <Menu.Item
                        key="2"
                        onClick={() => {
                          copyTemplate(item, idsequencer);
                        }}
                      >
                        Скопировать
                      </Menu.Item>
                      <Menu.Item key="3">
                        <ModalUpdateTemplate
                          setTemplates={setTemplates}
                          idsequencer={idsequencer}
                          idtemplate={item.idTemplate}
                        ></ModalUpdateTemplate>
                      </Menu.Item>
                      <Menu.Item
                        key="4"
                        onClick={() => handleDeleteTemplate(item.idTemplate)}
                        danger
                      >
                        Удалить
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button
                    icon={<MoreOutlined></MoreOutlined>}
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  ></Button>
                </Dropdown>
                {item.name}
              </Card>
            </div>
            {/* <SoundTwoTone className="soundMainIcon" />
            <Slider defaultValue={30} style={{ width: "100px" }} /> */}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TemplateList;
