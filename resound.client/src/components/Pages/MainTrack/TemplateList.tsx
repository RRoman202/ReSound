import React from "react";
import { Button, List, Card, Slider, Dropdown, Menu } from "antd";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useNavigate, Link } from "react-router-dom";
import { hideNav } from "./HiddenNavbar";
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
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onCreateTemplate,
  idsequencer,
  setTemplates,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.TEMPLATE,
    item: { name: "Template" },
  });

  const navigate = useNavigate();

  const createTemplate = () => {};

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
            <div ref={drag}>
              <Card
                style={{
                  backgroundColor: "lightblue",
                  width: "300px",
                  textAlign: "center",
                  position: "relative",
                }}
                hoverable
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
                      <Menu.Item key="2">
                        <ModalUpdateTemplate
                          setTemplates={setTemplates}
                          idsequencer={idsequencer}
                          idtemplate={item.idTemplate}
                        ></ModalUpdateTemplate>
                      </Menu.Item>
                      <Menu.Item
                        key="3"
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
            <SoundTwoTone className="soundMainIcon" />
            <Slider defaultValue={30} style={{ width: "100px" }} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TemplateList;
