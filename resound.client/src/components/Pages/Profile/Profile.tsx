import React, { useEffect, useState, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import ModalCreateProject from "./Modals/ModalCreateProject";
import { useNavigate, Link } from "react-router-dom";
import changeTheme from "../../NavBar/changeTheme";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import type { MenuProps, TourProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
  FormOutlined,
  LikeOutlined,
  BarChartOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Space,
  Typography,
  List,
  Card,
  Image,
  FloatButton,
  Input,
  Tour,
  Spin,
} from "antd";
import "./Home.css";
import AudioPlayer from "react-audio-player";
import axios from "axios";
import ModalUpdateProject from "./Modals/ModalUpdateProject";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const Profile = () => {
  viewNav();
  const { user } = useParams<{ user: string }>();
  console.log(user);
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://localhost:7262/Users/${user}`);
      setUserData(response.data);
    };
    const fetchTracks = async () => {
      const response = await axios.get(
        `https://localhost:7262/Tracks/user?iduser=${user}`
      );
      setTracks(response.data);
    };

    fetchUser();
    fetchTracks();
  }, [user]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get(
        `https://localhost:7262/Users/Follower?iduser=` +
          localStorage.getItem("userid")
      );
      response.data.forEach(async (user) => {
        if (user.idUser == userData.idUser) {
          setIsFollow(true);
        }
      });
    };
    fetchAllUsers();
  }, [userData]);

  const follow = () => {
    fetch("https://localhost:7262/Users/Follower", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        IdUser: userData.idUser,
        IdFollower: localStorage.getItem("userid"),
      }),
    });
    setIsFollow(true);
  };

  if (!userData || !tracks) {
    return <Spin size="large" fullscreen></Spin>;
  }

  return (
    <Layout>
      <Layout className="layoutHome">
        <Content
          style={{
            padding: "20px",
          }}
        >
          <Card className="creatediv">
            <Title level={2}>{userData.login}</Title>
            {isFollow ? (
              <Button onClick={follow} disabled>
                Вы подписаны
              </Button>
            ) : (
              <Button type="primary" onClick={follow}>
                Подписаться
              </Button>
            )}
          </Card>
          <Title level={4}>Музыкальные произведения</Title>
          <Search
            style={{ marginTop: 20 }}
            placeholder="Поиск музыкальных произведений"
            enterButton
          />
          <div>
            <List
              className="listprojects"
              grid={{ gutter: 12, column: 3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
              dataSource={tracks}
              renderItem={(sequencer) => (
                <List.Item>
                  <Card className="card-project" title={sequencer.name}>
                    <p>{sequencer.description}</p>
                    <AudioPlayer
                      style={{ marginTop: "10px" }}
                      src={
                        `https://localhost:7262/track/` + sequencer.idSequencer
                      }
                      autoPlay={false}
                      controls
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
