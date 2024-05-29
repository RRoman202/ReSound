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
  Space,
  Tooltip,
} from "antd";
import AudioPlayer from "react-audio-player";
import axios from "axios";
import {
  HeartOutlined,
  CommentOutlined,
  UserOutlined,
  StarFilled,
  CloseOutlined,
  PlayCircleOutlined,
  LikeFilled,
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

  const deleteComment = async (idcomment: string) => {
    const response = await axios.delete(
      `https://localhost:7262/Tracks/comment?idcomment=` + idcomment
    );
    fetchComments();
  };

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
    <div
      style={{ padding: "20px", backgroundColor: "#f5f5f5", height: "100vh" }}
    >
      <div>
        <Space wrap>
          <Image
            width={164}
            height={164}
            src={`https://localhost:7262/Files/cover?idsequencer=` + sequencer}
          />
          <Flex vertical style={{ width: "100vh", marginLeft: "20px" }}>
            <Col span={10}>
              {genres.map((genre) => (
                <Tag color="blue">{genre.name}</Tag>
              ))}
            </Col>
            <Typography.Title level={4}>{sequencerData.name}</Typography.Title>
            <Typography.Link
              type="secondary"
              onClick={() => navigate("/user/" + userData.idUser)}
            >
              {userData.login}
            </Typography.Link>
          </Flex>
        </Space>
      </div>

      <div style={{ marginTop: "20px" }}>
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
        <Button
          type="primary"
          style={{ marginLeft: "20px" }}
          onClick={showDrawer}
          icon={<CommentOutlined></CommentOutlined>}
        ></Button>
        <Rate
          value={mark!}
          onChange={(e) => AddMark(e, sequencer.toString())}
          style={{ marginLeft: "20px" }}
        ></Rate>
        <Tooltip title="Оценка">
          <Tag
            color="blue"
            icon={<StarFilled></StarFilled>}
            style={{ marginLeft: "20px" }}
          >
            <Typography.Text>{rate}</Typography.Text>
          </Tag>
        </Tooltip>
        <Tooltip title="Прослушивания">
          <Tag
            color="blue"
            icon={<PlayCircleOutlined />}
            style={{ marginLeft: "5px" }}
          >
            <Typography.Text>{sequencerData.views}</Typography.Text>
          </Tag>
        </Tooltip>
        <Tooltip title="Лайки">
          <Tag
            color="blue"
            icon={<LikeFilled></LikeFilled>}
            style={{ marginLeft: "5px" }}
          >
            <Typography.Text>{likescount}</Typography.Text>
          </Tag>
        </Tooltip>
      </div>
      <div
        style={{
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "white",
          marginTop: "20px",
        }}
      >
        <Typography.Title level={4}>Описание</Typography.Title>
        <Typography.Text>{sequencerData.description}</Typography.Text>
      </div>
      <Flex
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <AudioPlayer
          onEnded={() => AddViews(sequencer.toString())}
          style={{ marginTop: "10px" }}
          src={`https://localhost:7262/track/` + sequencer}
          autoPlay={false}
          controls
        />
        <Typography.Text
          type="secondary"
          style={{ marginTop: "35px", marginLeft: "20px" }}
        >
          {"Дата публикации: "}
          {moment(sequencerData.publicDate).format("DD MMMM YYYY HH:mm")}
        </Typography.Text>
      </Flex>
      <Drawer
        title={sequencerData.name}
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
              position: "relative",
            }}
          >
            {comment.user.idUser == localStorage.getItem("userid") ? (
              <Tooltip title="Удалить комментарий">
                <Button
                  style={{ position: "absolute", right: "10px" }}
                  icon={<CloseOutlined></CloseOutlined>}
                  size="small"
                  onClick={() => deleteComment(comment.idComment)}
                ></Button>
              </Tooltip>
            ) : (
              <></>
            )}
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
    </div>
  );
};

export default Track;
