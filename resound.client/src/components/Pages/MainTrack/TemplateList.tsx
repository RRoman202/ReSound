import React from "react";
import { Button, List, Card, Slider } from "antd";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useNavigate } from "react-router-dom";
import { hideNav } from "./HiddenNavbar";
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
import ModalCreateTemplate from "./Modals/ModalCreateTemplate";

interface Template {
  id: number;
  name: string;
}

interface TemplateListProps {
  templates: Template[];
  onCreateTemplate: () => void;
  idsequencer: string;
}

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onCreateTemplate,
  idsequencer,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.TEMPLATE,
    item: { name: "Template" },
  });

  const navigate = useNavigate();

  const createTemplate = () => {};

  return (
    <Card
      headStyle={{ backgroundColor: "#1677ff", color: "white" }}
      title="Шаблоны"
      className="listTemplates"
    >
      <ModalCreateTemplate idsequencer={idsequencer}></ModalCreateTemplate>
      <List
        dataSource={templates}
        renderItem={(item) => (
          <List.Item>
            <div
              ref={drag}
              onClick={() => {
                hideNav();
                navigate(`/piano/${item.idTemplate}`);
              }}
            >
              <Card
                style={{
                  backgroundColor: "lightblue",
                  width: "300px",
                  textAlign: "center",
                }}
              >
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
