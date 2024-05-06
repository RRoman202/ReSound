import React, { useState, useEffect } from "react";
import {
  Card,
  Image,
  Button,
  Row,
  Col,
  Typography,
  Rate,
  Input,
  Drawer,
  Flex,
  Avatar,
} from "antd";
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
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Import moment.js
import "moment/locale/ru";

const { Search } = Input;

interface MusicCardProps {
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
  likes: number;
  rating: number;
  name: string;
  idUser: number;
  idSequencer: number;
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
  const [commentData, setCommentData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const navigate = useNavigate();
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

  const fetchComments = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/comment?idsequencer=" + idSequencer
    );
    setCommentData(response.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const AddComment = async (comment: string, idsequencer: string) => {
    const formData = new FormData();
    formData.append("content", comment);
    formData.append("idsequencer", idsequencer);
    formData.append("iduser", localStorage.getItem("userid")!);
    const response = await axios.post(
      "https://localhost:7262/Tracks/comment",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    fetchComments();
  };

  moment.locale("ru");

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    await AddComment(newComment, idSequencer.toString());
    setNewComment("");
  };

  if (!userData || !commentData) {
    return null;
  }

  return (
    <Card style={{ marginTop: "20px", backgroundColor: "lightblue" }}>
      <Drawer
        title={name}
        extra={<p>Комментарии</p>}
        placement="right"
        onClose={onClose}
        open={openDrawer}
      >
        {commentData.map((comment) => (
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Avatar
              style={{ marginBottom: "5px" }}
              src={
                `https://localhost:7262/Files/avatar?iduser=` +
                comment.user.idUser
              }
              size={25}
              icon={<UserOutlined />}
            />
            <Typography.Link
              strong
              style={{ marginLeft: "10px", fontSize: "18px" }}
              onClick={() => navigate("/user/" + comment.user.idUser)}
            >
              {comment.user.login}
            </Typography.Link>

            <Flex vertical>
              <Typography.Text style={{ marginRight: "10px" }}>
                {comment.content}
              </Typography.Text>
              <Typography.Text style={{ fontSize: "11px" }}>
                {moment(comment.created).format("DD MMMM YYYY HH:mm")}
              </Typography.Text>
            </Flex>
          </div>
        ))}
        <Input.TextArea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Добавить комментарий..."
          style={{ marginTop: "20px" }}
        />
        <Button
          onClick={handleAddComment}
          type="primary"
          style={{ marginTop: "10px" }}
        >
          Отправить
        </Button>
      </Drawer>
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

          <Typography.Link
            type="secondary"
            onClick={() => navigate("/user/" + userData.idUser)}
          >
            {userData.login}
          </Typography.Link>

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
              <Button
                type="primary"
                style={{ marginLeft: "20px" }}
                onClick={showDrawer}
                icon={<CommentOutlined></CommentOutlined>}
              ></Button>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default MusicCard;
