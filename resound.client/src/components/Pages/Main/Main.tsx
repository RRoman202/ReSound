import Layout from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import { Carousel, Flex, Space, Button, List, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import background from "./background.png";
import AudioPlayer from "react-audio-player";
import axios from "axios";
import moment from "moment";
import "./Main.css";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#1677ff",
};

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [popularite, setPopularite] = useState([]);
  const [trackuser, setTrackuser] = useState([]);
  const [lastcomment, setLastComment] = useState([]);
  const [usercount, setUserCount] = useState(null);
  const [genrescount, setGenresCount] = useState([]);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const fetchGenresCount = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/genre-count"
    );
    setGenresCount(response.data);
  };

  const fetchPopularite = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/popularite"
    );
    setPopularite(response.data);
  };
  const fetchPopulariteUserTrack = async () => {
    const response = await axios.get(
      "https://localhost:7262/Users/popularite-track"
    );

    setTrackuser(response.data);
  };
  const fetchLastComment = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/last-comment"
    );
    setLastComment(response.data);
  };
  const fetchUserCount = async () => {
    const response = await axios.get(
      "https://localhost:7262/Users/users-count"
    );
    setUserCount(response.data);
  };
  useEffect(() => {
    fetchPopularite();
    fetchUserCount();
    fetchLastComment();
    fetchPopulariteUserTrack();
    fetchGenresCount();
  }, []);
  return (
    <div style={{ backgroundColor: "black" }}>
      <Layout style={{ alignItems: "center", backgroundColor: "black" }}>
        <div style={{ position: "absolute", backgroundColor: "black" }}>
          <img
            src={background}
            style={{
              width: "195vh",
              filter: "blur(10px)",
              pointerEvents: "none",
              backgroundColor: "black",
            }}
          ></img>
        </div>

        <h1
          style={{
            fontSize: "50px",
            zIndex: "2",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ReSound
        </h1>
        <h2 style={{ fontSize: "30px", zIndex: "2", color: "white" }}>
          Создайте свою музыку прямо сейчас!
        </h2>

        <Button
          type="primary"
          style={{ width: "300px", height: "50px", fontSize: "25px" }}
        >
          Начать
        </Button>
      </Layout>
      <Layout>
        <Carousel
          style={{
            marginTop: "300px",
            height: "300px",
            backgroundColor: "black",
          }}
          afterChange={onChange}
          autoplay
        >
          <div>
            <h3 style={contentStyle}>
              Создайте собственную музыку при помощи гибко настраиваемого
              секвенсора
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Обширная библиотека звуков для разных жанров музыки
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Сохранение своих работ в файлы аудио формата
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Сохранение своих работ на площадке для дальнейшей работы с ними
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>Публикация своих работ на площадке</h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Возможность оценивать работы других людей и оставлять комментарии
            </h3>
          </div>
        </Carousel>
      </Layout>
      <Layout style={{ backgroundColor: "lightblue" }}>
        <Typography.Title level={3}>Популярные треки</Typography.Title>
        <List
          grid={{ gutter: 12, column: 3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          dataSource={popularite.slice(0, 3)}
          renderItem={(sequencer) => (
            <List.Item>
              <Card className="card-project" title={sequencer.name}>
                <p>{sequencer.description}</p>
                <AudioPlayer
                  style={{ marginTop: "10px" }}
                  src={`https://localhost:7262/track/` + sequencer.idSequencer}
                  autoPlay={false}
                  controls
                />
              </Card>
            </List.Item>
          )}
        />
      </Layout>
      <Layout style={{ backgroundColor: "lightblue" }}>
        <Typography.Title level={3}>
          Последние треки от популярных пользователей
        </Typography.Title>
        <List
          grid={{ gutter: 12, column: 3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          dataSource={trackuser}
          renderItem={(sequencer) => (
            <List.Item>
              <Card className="card-project" title={sequencer.name}>
                <p>{sequencer.description}</p>
                <AudioPlayer
                  style={{ marginTop: "10px" }}
                  src={`https://localhost:7262/track/` + sequencer.idSequencer}
                  autoPlay={false}
                  controls
                />
              </Card>
            </List.Item>
          )}
        />
      </Layout>
      <Layout style={{ backgroundColor: "lightblue" }}>
        <Typography.Title level={3}>Отзывы</Typography.Title>
        <List
          grid={{ gutter: 12, column: 3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          dataSource={lastcomment}
          renderItem={(comment) => (
            <List.Item>
              <Card className="card-project" title={comment.user.login}>
                <div>
                  <Typography.Text style={{ marginRight: "10px" }}>
                    {comment.content}
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: "11px" }}>
                    {moment(comment.created).format("DD MMMM YYYY HH:mm")}
                  </Typography.Text>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Layout>
      <Layout style={{ backgroundColor: "lightblue" }}>
        <Typography.Title level={3}>
          {" "}
          Количество пользователей: {usercount}
        </Typography.Title>
        <List
          grid={{ gutter: 12, column: 3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
          dataSource={genrescount}
          renderItem={(genre) => (
            <List.Item>
              <div>
                <Typography.Title level={2}>
                  {genre.name}: {genre.count}
                </Typography.Title>
              </div>
            </List.Item>
          )}
        />
      </Layout>
    </div>
  );
};

export default Main;
