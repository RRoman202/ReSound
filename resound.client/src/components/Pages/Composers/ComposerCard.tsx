import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Image,
  Button,
  Row,
  Col,
  Typography,
  Input,
  Tag,
  Avatar,
} from "antd";
import {
  CaretUpOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  SoundTwoTone,
  BorderOutlined,
  PauseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Search } = Input;

interface ComposerCardProps {
  avatar: string;
  login: string;
  genres: string[];
}

const ComposerCard: React.FC<ComposerCardProps> = ({
  avatar,
  login,
  genres,
  idUser,
}) => {
  const navigate = useNavigate();
  const toUser = (id: string) => {
    navigate("/user/" + id);
  };
  return (
    <Card
      style={{ marginTop: "20px", backgroundColor: "lightblue" }}
      size="small"
      onClick={() => toUser(idUser)}
      hoverable
    >
      <Row gutter={16} style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <Col span={4}>
          <Avatar
            size={64}
            src={`https://localhost:7262/Files/avatar?iduser=` + idUser}
            style={{ marginTop: "0" }}
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>{login}</Typography.Title>
          {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
            {genres.map((genre) => (
              <Tag key={genre} color="blue">
                {genre}
              </Tag>
            ))}
          </div> */}
        </Col>
      </Row>
    </Card>
  );
};

export default ComposerCard;
