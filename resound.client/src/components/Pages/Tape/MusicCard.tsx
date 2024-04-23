import React, { useState } from "react";
import { Card, Image, Button, Row, Col, Typography } from "antd";
import AudioPlayer from "react-audio-player";

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
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card style={{ marginTop: "20px" }}>
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
          <Typography.Title level={4}>{title}</Typography.Title>
          <Typography.Text type="secondary">{artist}</Typography.Text>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <AudioPlayer
              style={{ marginTop: "10px" }}
              src={audioSrc}
              autoPlay={false}
              controls
            />
          </div>

          <Row justify="space-between" style={{ marginTop: "35px" }}>
            <Col>
              <Typography.Text>Понравилось: {likes}</Typography.Text>
            </Col>
            <Col>
              <Typography.Text>Рейтинг: {rating}</Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default MusicCard;
