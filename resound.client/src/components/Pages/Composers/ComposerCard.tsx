import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [followers, setFollowers] = useState(null);
  const toUser = (id: string) => {
    navigate("/user/" + id);
  };
  const getFollowersCount = async () => {
    const response = await axios.get(
      "https://localhost:7262/Users/follower-count?iduser=" + idUser
    );
    setFollowers(response.data);
  };
  useEffect(() => {
    getFollowersCount();
  }, []);
  return (
    <Card
      style={{ marginTop: "20px", backgroundColor: "lightblue" }}
      size="small"
      onClick={() => toUser(idUser)}
      hoverable
    >
      <Row>
        <Col span={4}>
          <Avatar
            size={64}
            src={`https://localhost:7262/Files/avatar?iduser=` + idUser}
            style={{ marginTop: "0" }}
          />
        </Col>
        <Col span={12} style={{}}>
          <Typography.Title level={4}>{login}</Typography.Title>
          <Typography.Text>Количество подписчиков: {followers}</Typography.Text>
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
