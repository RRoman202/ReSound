import React, { useState, useEffect } from "react";
import { Card, Image, Button, Row, Col, Typography, Rate, Input } from "antd";
import AudioPlayer from "react-audio-player";
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
  HeartOutlined,
} from "@ant-design/icons";

const { Search } = Input;

interface MusicCardProps {
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
  likes: number;
  rating: number;
}

const MusicCard: React.FC<MusicCardProps> = ({
  title,
  artist,
  cover,
  audioSrc,
  likes,
  rating,
  name,
  idUser,
  idSequencer,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get(
        "https://localhost:7262/Users/" + idUser
      );
      setUserData(response.data);
      console.log(userData);
    };
    fetchSequencers();
  }, []);

  if (!userData) {
    return null;
  }

  return (
    <Card style={{ marginTop: "20px", backgroundColor: "lightblue" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Image
            width={128}
            height={128}
            src={cover}
            style={{ marginTop: "35px" }}
          />
        </Col>
        <Col span={16}>
          <Typography.Title level={4}>{name}</Typography.Title>
          <Typography.Text type="secondary">{userData.login}</Typography.Text>

          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <AudioPlayer
              style={{ marginTop: "10px" }}
              src={`https://localhost:7262/track/` + idSequencer}
              autoPlay={false}
              controls
            />
          </div>

          <Row justify="space-between" style={{ marginTop: "35px" }}>
            <Col>
              <Button shape="circle" icon={<HeartOutlined />}></Button>
              <Rate style={{ marginLeft: "20px" }}></Rate>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default MusicCard;
