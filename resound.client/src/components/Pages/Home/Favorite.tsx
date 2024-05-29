import React, { useEffect, useState, useReducer, useRef } from "react";
import ModalCreateProject from "./Modals/ModalCreateProject";
import { useNavigate, Link } from "react-router-dom";
import changeTheme from "../../NavBar/changeTheme";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import AudioPlayer from "react-audio-player";
import moment from "moment";
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
  ExportOutlined,
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
} from "antd";
import "./Home.css";
import axios from "axios";
import ModalUpdateProject from "./Modals/ModalUpdateProject";
import ModalUpdateUser from "./Modals/ModalUpdateUser";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const customLabels = ["Проекты", "Опубликованные", "Избранные", "Статистика"];
const customIcons = [
  FormOutlined,
  ExportOutlined,
  LikeOutlined,
  BarChartOutlined,
];

const itemsMenu = customLabels.map((label, index) => ({
  key: String(index + 1),
  icon: React.createElement(customIcons[index]),
  label: label,
}));

const user = JSON.parse(localStorage.getItem("userfull")!);

let menu = null;
if (user != null) {
  menu = (
    <Menu>
      <Menu.Item key="1">
        <ModalUpdateUser userlogin={user.login}></ModalUpdateUser>
      </Menu.Item>
    </Menu>
  );
}

const UserPanel = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 20,
    }}
  >
    <Avatar
      src={`https://localhost:7262/Files/avatar?iduser=` + user.idUser}
      size={50}
      icon={<UserOutlined />}
    />
    <p>{user.login}</p>
    <p>{user.email}</p>
    <Dropdown overlay={menu}>
      <Button>
        <SettingOutlined />
      </Button>
    </Dropdown>
  </div>
);

const Favorite = () => {
  viewNav();

  const navigate = useNavigate();
  const [sequencers, setSequencers] = useState([]);
  const [filteredSequencers, setFilteredSequencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get(
        "https://localhost:7262/Tracks/Favorite?iduser=" +
          localStorage.getItem("userid")
      );
      setSequencers(response.data);
      setFilteredSequencers(response.data);
    };
    fetchSequencers();
  }, []);

  const changeMenu = async (value: string) => {
    if (value === "1") {
      navigate("/home");
    }
    if (value === "2") {
      navigate("/publictracks");
    }
    if (value === "3") {
      navigate("/favorite");
    }
    if (value === "4") {
      navigate("/statistic");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = sequencers.filter((sequencer) =>
      sequencer.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSequencers(filtered);
  };

  const handleSort = (key: string) => {
    if (key == "1") {
      let sorted = sequencers.sort((s1, s2) =>
        moment(s2.publicDate).diff(moment(s1.publicDate))
      );
      setFilteredSequencers(sorted.filter((s1) => s1));
    }
    if (key == "2") {
      let sorted = sequencers.sort((s1, s2) =>
        moment(s1.publicDate).diff(moment(s2.publicDate))
      );
      setFilteredSequencers(sorted.filter((s1) => s1));
    }
  };

  return (
    <Layout>
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <div>
          <UserPanel />
        </div>

        <Menu
          onSelect={(e) => changeMenu(e.key)}
          className="sidemenu"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["3"]}
          items={itemsMenu}
        />
      </Sider>
      <Layout className="layoutHome">
        <Content
          style={{
            padding: "20px",
          }}
        >
          <Card className="creatediv">
            <Title level={2}>Избранные музыкальные произведения</Title>
          </Card>

          <Space wrap>
            <Search
              style={{ marginTop: 20, width: "167.5vh" }}
              placeholder="Поиск музыкальных произведений"
              enterButton
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={(e) => handleSort(e.key)}>
                    Сначало новые
                  </Menu.Item>
                  <Menu.Item key="2" onClick={(e) => handleSort(e.key)}>
                    Сначало старые
                  </Menu.Item>
                </Menu>
              }
            >
              <Button style={{ marginTop: 20 }}>Сортировка</Button>
            </Dropdown>
          </Space>
          <div>
            <List
              className="listprojects"
              grid={{ gutter: 12, column: 3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
              dataSource={filteredSequencers}
              renderItem={(sequencer) => (
                <List.Item>
                  <Card
                    className="card-project"
                    title={sequencer.name}
                    extra={
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key="1">
                              <Link to={`/track/${sequencer.idSequencer}`}>
                                Подробнее
                              </Link>
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button icon={<MoreOutlined></MoreOutlined>}></Button>
                      </Dropdown>
                    }
                  >
                    <Space>
                      <img
                        width={50}
                        height={50}
                        src={
                          `https://localhost:7262/Files/cover?idsequencer=` +
                          sequencer.idSequencer
                        }
                      />
                      <div style={{ marginRight: "10px" }}>
                        <AudioPlayer
                          src={
                            `https://localhost:7262/track/` +
                            sequencer.idSequencer
                          }
                          autoPlay={false}
                          controls
                        />
                      </div>
                    </Space>
                    <Typography.Text type="secondary">
                      {"Дата публикации: "}
                      {moment(sequencer.publicDate).format(
                        "DD MMMM YYYY HH:mm"
                      )}
                    </Typography.Text>
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

export default Favorite;
