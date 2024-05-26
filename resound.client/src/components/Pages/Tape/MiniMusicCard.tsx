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
  Tag,
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
  views: number;
}

const MiniMusicCard: React.FC<MusicCardProps> = ({
  title,
  artist,
  cover,
  audioSrc,
  likes,
  rating,
  name,
  idUser,
  idSequencer,
  views,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [mark, setMark] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [rate, setRate] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [popularite, setPopularite] = useState(null);
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllFavorites = async () => {
      const response = await axios.get(
        `https://localhost:7262/Tracks/Favorite?iduser=` +
          localStorage.getItem("userid")
      );
      response.data.forEach(async (user) => {
        if (user.idSequencer == idSequencer) {
          setIsFavorite(true);
        }
      });
    };
    fetchAllFavorites();
  }, [userData]);

  const addFavorite = () => {
    fetch("https://localhost:7262/Tracks/Favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        IdUser: localStorage.getItem("userid"),
        IdSequencer: idSequencer,
      }),
    });
    setIsFavorite(true);
  };

  const deleteFavorite = async () => {
    fetch("https://localhost:7262/Tracks/Favorite", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        IdUser: localStorage.getItem("userid"),
        idSequencer: idSequencer,
      }),
    });
    setIsFavorite(false);
  };

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

  useEffect(() => {
    const fetchRate = async () => {
      const response = await axios.get(
        "https://localhost:7262/Tracks/rating?idsequencer=" + idSequencer
      );
      setRate(response.data);
    };
    fetchRate();
  }, []);

  useEffect(() => {
    const fetchMark = async () => {
      const response = await axios.get(
        "https://localhost:7262/Tracks/mark?idsequencer=" +
          idSequencer +
          "&iduser=" +
          localStorage.getItem("userid")
      );
      setMark(response.data.value);
    };
    fetchMark();
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

  const AddViews = async () => {
    const response = await axios.patch(
      "https://localhost:7262/Tracks/views?idsequencer=" + idSequencer,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  const AddMark = async (value: number, idsequencer: string) => {
    const formData = new FormData();
    formData.append("value", value.toString());
    formData.append("idsequencer", idsequencer);
    formData.append("iduser", localStorage.getItem("userid")!);
    const response = await axios.post(
      "https://localhost:7262/Tracks/mark",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setMark(response.data.value);
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
    <Card
      title={name}
      extra={
        <Typography.Link
          type="secondary"
          onClick={() => navigate("/user/" + userData.idUser)}
        >
          {userData.login}
        </Typography.Link>
      }
      style={{ marginTop: "20px", backgroundColor: "lightblue" }}
    >
      <Drawer
        title={name}
        extra={<p>Комментарии</p>}
        placement="right"
        onClose={onClose}
        open={openDrawer}
      >
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
      </Drawer>

      <AudioPlayer
        style={{ width: "80%" }}
        onEnded={() => AddViews(idSequencer.toString())}
        src={`https://localhost:7262/track/` + idSequencer}
        autoPlay={false}
        controls
      />
      <Button
        type="primary"
        style={{ marginLeft: "20px" }}
        onClick={showDrawer}
        icon={<CommentOutlined></CommentOutlined>}
      ></Button>
    </Card>
  );
};

export default MiniMusicCard;
