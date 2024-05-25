import Layout from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  Flex,
  Space,
  Button,
  List,
  Typography,
  Card,
  Avatar,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import background from "./background.png";
import logo from "./logo.png";
import AudioPlayer from "react-audio-player";
import axios from "axios";
import moment from "moment";
import "./Main.css";
import { TrackCard } from "./TrackCard";

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
  const [popusers, setPopUsers] = useState([]);
  const [followers, setFollowers] = useState<number[]>([]);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const fetchGenresCount = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/genre-count"
    );
    const sortedGenrescount = response.data.sort((a, b) => b.count - a.count);
    setGenresCount(sortedGenrescount);
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
  const fetchPopulariteUsers = async () => {
    const response = await axios.get(`https://localhost:7262/Users/popularite`);
    setPopUsers(response.data);
    response.data.forEach((user) => {
      getFollowersCount(user.idUser);
    });
    console.log(followers);
  };
  const getFollowersCount = async (idUser: string) => {
    const response = await axios.get(
      "https://localhost:7262/Users/follower-count?iduser=" + idUser
    );
    const newfollowers = followers.push(response.data);
    setFollowers(newfollowers);
  };
  useEffect(() => {
    fetchPopularite();
    fetchUserCount();
    fetchLastComment();
    fetchPopulariteUserTrack();
    fetchGenresCount();
    fetchPopulariteUsers();
  }, []);
  return (
    <div style={{ backgroundColor: "#001529" }}>
      <Layout
        style={{
          backgroundColor: "#001529",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            backgroundColor: "#1677ff",
            height: "700px",
          }}
        >
          {/* <img
            src={background}
            style={{
              // width: "200vh",
              height: "700px",
              filter: "blur(5px)",
              pointerEvents: "none",
              backgroundColor: "black",
            }}
          ></img> */}
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
        <img
          src={logo}
          style={{
            height: "250px",

            pointerEvents: "none",
          }}
        ></img>

        {/* <Button
          type="primary"
          style={{ width: "300px", height: "50px", fontSize: "25px" }}
        >
          Начать
        </Button> */}
      </Layout>
      <Layout
        style={{ position: "relative", marginTop: "100px", height: "1000px" }}
      >
        <div style={{ backgroundColor: "black" }}>
          <Carousel
            style={{
              height: "300px",
              width: "50%",
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
                Возможность оценивать работы других людей и оставлять
                комментарии
              </h3>
            </div>
          </Carousel>
          <div
            style={{
              width: "50%",
              height: "500px",
              backgroundColor: "white",
              position: "absolute",
              top: "0",
              right: "0",
              padding: "20px",
            }}
          >
            <Typography.Title>Музыка на любой вкус</Typography.Title>
            <Typography.Text type="secondary">
              Количество треков по жанрам
            </Typography.Text>
            <List
              grid={{ gutter: 12, column: 3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "20px",
              }}
              dataSource={genrescount}
              renderItem={(genre) => (
                <List.Item>
                  <div
                    style={{
                      backgroundColor: "#1677ff",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <Typography.Text style={{ fontSize: "20px" }}>
                      {genre.name}: {genre.count}
                    </Typography.Text>
                  </div>
                </List.Item>
              )}
            />
          </div>

          <div
            style={{
              position: "absolute",
              backgroundColor: "#1677ff",
              left: "0",
              bottom: "0",
              width: "50%",
              height: "700px",
              padding: "20px",
            }}
          >
            <Typography.Title level={2} style={{ color: "white" }}>
              Наши пользователи
            </Typography.Title>
            <Typography.Text
              style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
            >
              Количество пользователей: {usercount}
            </Typography.Text>
            <div
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "10px",
                marginTop: "70px",
              }}
            >
              <Typography.Title level={3}>
                Популярные пользователи
              </Typography.Title>
              <Typography.Text type="secondary">
                Подборка популярных пользователей по количеству подписчиков
              </Typography.Text>
              <List
                grid={{ gutter: 12, column: 3 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  padding: "20px",
                }}
                dataSource={popusers.slice(0, 3)}
                renderItem={(user) => (
                  <List.Item>
                    <div
                      style={{
                        backgroundColor: "#001529",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <Avatar
                        src={
                          `https://localhost:7262/Files/avatar?iduser=` +
                          user.idUser
                        }
                        size={50}
                      />
                      <Typography.Text
                        style={{ color: "white", marginLeft: "20px" }}
                      >
                        {user.login}
                      </Typography.Text>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div
            style={{
              width: "50%",
              height: "500px",
              position: "absolute",
              bottom: "0",
              right: "0",
              backgroundColor: "#001529",
              padding: "20px",
            }}
          >
            <Typography.Title style={{ color: "white" }}>
              Популярные треки
            </Typography.Title>
            <Typography.Text type="secondary" style={{ color: "white" }}>
              Наслаждайтесь лучшей музыкой
            </Typography.Text>
            <List
              grid={{ gutter: 12, column: 3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "20px",
              }}
              dataSource={popularite.slice(0, 3)}
              renderItem={(sequencer) => (
                <List.Item>
                  <TrackCard
                    idSequencer={sequencer.idSequencer}
                    sequencerName={sequencer.name}
                    idUser={sequencer.idUser}
                    created={sequencer.created}
                    color="white"
                    textcolor="black"
                  ></TrackCard>
                </List.Item>
              )}
            />
          </div>
          <hr
            style={{
              width: "50%",
              height: "2px",
              borderColor: "white",
              backgroundColor: "white",
              position: "absolute",
              top: "300px",
            }}
          ></hr>
        </div>
      </Layout>

      <Layout style={{ backgroundColor: "white" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Новинки
        </Typography.Title>
        <List
          grid={{ gutter: 12, column: 3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "20px",
          }}
          dataSource={trackuser}
          renderItem={(sequencer) => (
            <List.Item>
              <TrackCard
                idSequencer={sequencer.idSequencer}
                sequencerName={sequencer.name}
                idUser={sequencer.idUser}
                created={sequencer.created}
                color="#001529"
                textcolor="white"
              ></TrackCard>
            </List.Item>
          )}
        />
      </Layout>
      <Layout style={{ backgroundColor: "#1677ff" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Отзывы
        </Typography.Title>
        <List
          grid={{ gutter: 12, column: 3 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          dataSource={lastcomment}
          renderItem={(comment) => (
            <List.Item>
              <div
                className="card-project"
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  textAlign: "center",
                  padding: "10px",
                  alignItems: "center",
                  alignContent: "center",
                  width: "400px",
                }}
              >
                <div>
                  <Avatar
                    src={
                      `https://localhost:7262/Files/avatar?iduser=` +
                      comment.user.idUser
                    }
                    size={100}
                  />
                </div>

                <Typography.Text>{comment.user.login}</Typography.Text>
                <div
                  style={{
                    backgroundColor: "#d9d9d9",
                    borderRadius: "10px",
                    textAlign: "center",
                    padding: "10px",
                    width: "50%",
                    alignItems: "center",
                    margin: "20px auto",
                  }}
                >
                  <Typography.Paragraph
                    ellipsis={{
                      expandable: "collapsible",
                      rows: 5,

                      symbol: "Подробнее",
                    }}
                  >
                    {comment.content}
                  </Typography.Paragraph>
                </div>
                <Typography.Text style={{ fontSize: "11px" }}>
                  {moment(comment.created).format("DD MMMM YYYY HH:mm")}
                </Typography.Text>
              </div>
            </List.Item>
          )}
        />
      </Layout>
    </div>
  );
};

export default Main;
