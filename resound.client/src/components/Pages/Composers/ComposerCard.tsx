import React, { useState } from "react";
import { Card, Image, Button, Row, Col, Typography, Input, Tag } from "antd";
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
}) => {
  return (
    <Card
      style={{ marginTop: "20px", backgroundColor: "lightblue" }}
      size="small"
    >
      <Row gutter={16} style={{ display: "flex", alignItems: "center" }}>
        {" "}
        {/* Use Flexbox */}
        <Col span={4}>
          <Image
            width={64}
            height={64}
            src={avatar}
            style={{ marginTop: "0" }} // Remove image margin
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>{login}</Typography.Title>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {genres.map((genre) => (
              <Tag key={genre} color="blue">
                {genre}
              </Tag>
            ))}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ComposerCard;
