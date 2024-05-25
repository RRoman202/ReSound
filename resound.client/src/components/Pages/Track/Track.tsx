import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  HeartOutlined,
  CommentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
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

const Track = () => {
  const { sequencer } = useParams<{ sequencer: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUserData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [mark, setMark] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [rate, setRate] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [genres, setGenres] = useState([]);
  const [likescount, setlikescount] = useState(null);
  const [sequencerData, setSequencerData] = useState(null);
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
        if (user.idSequencer == sequencer) {
          setIsFavorite(true);
        }
      });
    };
    fetchAllFavorites();
  }, [userData]);

  const getSequencer = async () => {
    const response = await axios.get(
      `https://localhost:7262/Tracks/track?idsequencer=` + sequencer
    );
    setSequencerData(response.data);
  };

  const getGenres = async () => {
    const response = await axios.get(
      `https://localhost:7262/Tracks/track-genre?idsequencer=` + sequencer
    );
    setGenres(response.data);
  };

  const getLikesCount = async () => {
    const response = await axios.get(
      `https://localhost:7262/Tracks/likes-count?idsequencer=` + sequencer
    );
    setlikescount(response.data);
  };

  const addFavorite = () => {
    fetch("https://localhost:7262/Tracks/Favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        IdUser: localStorage.getItem("userid"),
        IdSequencer: sequencer,
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
        idSequencer: sequencer,
      }),
    });
    setIsFavorite(false);
  };

  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get(
        "https://localhost:7262/Users/" + sequencerData.idUser
      );
      setUserData(response.data);
      console.log(userData);
    };
    fetchSequencers();
  }, [sequencerData]);

  useEffect(() => {
    const fetchRate = async () => {
      const response = await axios.get(
        "https://localhost:7262/Tracks/rating?idsequencer=" + sequencer
      );
      setRate(response.data);
    };
    fetchRate();
  }, [sequencer]);

  useEffect(() => {
    const fetchMark = async () => {
      const response = await axios.get(
        "https://localhost:7262/Tracks/mark?idsequencer=" +
          sequencer +
          "&iduser=" +
          localStorage.getItem("userid")
      );
      setMark(response.data.value);
    };
    fetchMark();
  }, [sequencer]);

  const fetchComments = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/comment?idsequencer=" + sequencer
    );
    setCommentData(response.data);
  };

  useEffect(() => {
    fetchComments();
    getGenres();
    getLikesCount();
    getSequencer();
  }, [sequencer]);

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
      "https://localhost:7262/Tracks/views?idsequencer=" + sequencer,
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
    await AddComment(newComment, sequencer.toString());
    setNewComment("");
  };

  if (!userData || !commentData || !sequencerData || !sequencer) {
    return null;
  }

  return (
    <Card style={{ marginTop: "20px", backgroundColor: "lightblue" }}>
      <Drawer
        title={sequencerData.name}
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
            width={164}
            height={164}
            src={`https://localhost:7262/Files/cover?idsequencer=` + sequencer}
            style={{ marginTop: "35px" }}
          />
        </Col>
        <Col span={10}>
          {genres.map((genre) => (
            <Tag color="blue">{genre.name}</Tag>
          ))}
          <Typography.Title level={4}>{name}</Typography.Title>

          <Typography.Link
            type="secondary"
            onClick={() => navigate("/user/" + userData.idUser)}
          >
            {userData.login}
          </Typography.Link>

          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <AudioPlayer
              onEnded={() => AddViews(sequencer.toString())}
              style={{ marginTop: "10px" }}
              src={`https://localhost:7262/track/` + sequencer}
              autoPlay={false}
              controls
            />
          </div>

          <Row justify="space-between" style={{ marginTop: "35px" }}>
            <Col>
              {isFavorite ? (
                <Button
                  onClick={deleteFavorite}
                  type="primary"
                  shape="circle"
                  icon={<HeartOutlined />}
                ></Button>
              ) : (
                <Button
                  onClick={addFavorite}
                  shape="circle"
                  icon={<HeartOutlined />}
                ></Button>
              )}

              <Rate
                value={mark!}
                onChange={(e) => AddMark(e, sequencer.toString())}
                style={{ marginLeft: "20px" }}
              ></Rate>
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
        <Col span={6} style={{ textAlign: "end" }}>
          <Flex gap={5} vertical>
            <Tag color="blue">
              <Typography.Text>Рейтинг: {rate}</Typography.Text>
            </Tag>
            <Tag color="blue">
              <Typography.Text>
                Прослушали: {sequencerData.views}
              </Typography.Text>
            </Tag>
            <Tag color="blue">
              <Typography.Text>Понравилось: {likescount}</Typography.Text>
            </Tag>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default Track;
