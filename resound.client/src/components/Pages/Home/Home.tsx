import React, { useEffect, useState, useReducer, useRef } from "react";
import ModalCreateProject from "./Modals/ModalCreateProject";
import { useNavigate, Link } from "react-router-dom";
import changeTheme from "../../NavBar/changeTheme";
import { hideNav, viewNav } from "../MainTrack/HiddenNavbar";
import type { MenuProps, TourProps } from "antd";
import moment from "moment";
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
  FilterOutlined,
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
  Tag,
  Spin,
} from "antd";
import "./Home.css";
import axios from "axios";
import ModalUpdateProject from "./Modals/ModalUpdateProject";
import ModalUpdateUser from "./Modals/ModalUpdateUser";
import PublicButton from "./PublicButton";

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

const Home = () => {
  viewNav();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [openTour, setOpenTour] = useState<boolean>(false);
  const steps: TourProps["steps"] = [
    {
      title: "Ваши данные",
      description: "Следите за вашими проектами и их статистикой.",
      target: () => ref1.current,
      nextButtonProps: {
        children: <>Дальше</>,
      },
      prevButtonProps: {
        children: <>Назад</>,
      },
    },
    {
      title: "Новые шедевры",
      description: "Создавайте свои проекты и сочиняйте музыку.",
      target: () => ref2.current,
      nextButtonProps: {
        children: <>Дальше</>,
      },
      prevButtonProps: {
        children: <>Назад</>,
      },
    },
    {
      title: "Продолжайте работу",
      description: "Начните с того места откуда закончили.",
      target: () => ref3.current,
      nextButtonProps: {
        children: <>Закончить</>,
      },
      prevButtonProps: {
        children: <>Назад</>,
      },
    },
  ];

  const navigate = useNavigate();
  const [sequencers, setSequencers] = useState([]);
  const [filteredSequencers, setFilteredSequencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get(
        "https://localhost:7262/api/Sequencers?iduser=" +
          localStorage.getItem("userid")
      );
      setSequencers(response.data);
      setFilteredSequencers(response.data);
      console.log("qwer");
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

  const handleDeleteSequencer = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7262/api/Sequencers/${id}`);
      const updatedSequencers = sequencers.filter(
        (sequencer) => sequencer.idSequencer !== id
      );
      setSequencers(updatedSequencers);
      setFilteredSequencers(updatedSequencers);
    } catch (error) {
      console.error("Error deleting sequencer:", error);
    }
  };
  const openSequencer = async (id: string) => {
    localStorage.setItem("sequencerid", id);
    navigate(`/maintrack/${id}`);
  };

  const handleSort = (key: string) => {
    if (key == "1") {
      let sorted = sequencers.sort((s1, s2) =>
        moment(s2.created).diff(moment(s1.created))
      );
      setFilteredSequencers(sorted.filter((s1) => s1));
    }
    if (key == "2") {
      let sorted = sequencers.sort((s1, s2) =>
        moment(s1.created).diff(moment(s2.created))
      );
      setFilteredSequencers(sorted.filter((s1) => s1));
    }
    if (key == "3") {
      let sorted = sequencers.sort((s1, s2) =>
        moment(s2.updated).diff(moment(s1.updated))
      );
      setFilteredSequencers(sorted.filter((s1) => s1));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = sequencers.filter((sequencer) =>
      sequencer.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSequencers(filtered);
  };

  const handleFilter = (key: string) => {
    if (key == "1") {
      setFilteredSequencers(sequencers);
    }
    if (key == "2") {
      setFilteredSequencers(
        sequencers.filter((sequencer) => sequencer.private == false)
      );
    }
    if (key == "3") {
      setFilteredSequencers(
        sequencers.filter((sequencer) => sequencer.private == true)
      );
    }
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <Typography.Title style={{ marginBottom: "300px" }}>
            Публикация трека...
          </Typography.Title>
          <Spin size="large" fullscreen />
        </div>
      ) : (
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
            <div ref={ref1}>
              <UserPanel />
            </div>

            <Menu
              onSelect={(e) => changeMenu(e.key)}
              className="sidemenu"
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={itemsMenu}
            />
          </Sider>
          <Layout className="layoutHome">
            <Content
              style={{
                padding: "20px",
              }}
            >
              <Card className="creatediv" ref={ref2}>
                <Title level={2}>Создать музыку</Title>
                <ModalCreateProject
                  setFilteredSequencers={setFilteredSequencers}
                  setSequencers={setSequencers}
                ></ModalCreateProject>
              </Card>
              <Title level={4}>Мои музыкальные произведения</Title>
              <Space wrap>
                <Search
                  style={{ marginTop: 20, width: "162vh" }}
                  placeholder="Поиск музыкальных произведений"
                  enterButton
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="1" onClick={(e) => handleFilter(e.key)}>
                        Все
                      </Menu.Item>
                      <Menu.Item key="2" onClick={(e) => handleFilter(e.key)}>
                        Публичные
                      </Menu.Item>
                      <Menu.Item key="3" onClick={(e) => handleFilter(e.key)}>
                        Приватные
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button
                    style={{ marginTop: 20 }}
                    icon={<FilterOutlined></FilterOutlined>}
                  ></Button>
                </Dropdown>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="1" onClick={(e) => handleSort(e.key)}>
                        Сначало новые
                      </Menu.Item>
                      <Menu.Item key="2" onClick={(e) => handleSort(e.key)}>
                        Сначало старые
                      </Menu.Item>
                      <Menu.Item key="3" onClick={(e) => handleSort(e.key)}>
                        Недавно изменены
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
                    <List.Item ref={ref3}>
                      <Card
                        className="card-project"
                        title={
                          <Space>
                            <p>{sequencer.name}</p>
                            {sequencer.private ? (
                              <>
                                <Tag color="blue">Приватный</Tag>
                              </>
                            ) : (
                              <>
                                <Tag color="blue">Публичный</Tag>
                              </>
                            )}
                          </Space>
                        }
                        extra={
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key="1">
                                  <Link
                                    to={`/maintrack/${sequencer.idSequencer}`}
                                    onClick={() =>
                                      openSequencer(sequencer.idSequencer)
                                    }
                                  >
                                    Открыть
                                  </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                  <PublicButton
                                    setLoading={setLoading}
                                    idSequencer={sequencer.idSequencer}
                                  ></PublicButton>
                                </Menu.Item>
                                <Menu.Item key="3">
                                  <ModalUpdateProject
                                    setFilteredSequencers={
                                      setFilteredSequencers
                                    }
                                    setSequencers={setSequencers}
                                    idsequencer={sequencer.idSequencer}
                                  ></ModalUpdateProject>
                                </Menu.Item>
                                <Menu.Item key="4" danger>
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() =>
                                      handleDeleteSequencer(
                                        sequencer.idSequencer
                                      )
                                    }
                                  >
                                    Удалить
                                  </a>
                                </Menu.Item>
                              </Menu>
                            }
                          >
                            <Button
                              icon={<MoreOutlined></MoreOutlined>}
                            ></Button>
                          </Dropdown>
                        }
                        hoverable
                      >
                        <p>{sequencer.description}</p>
                        <Button
                          type="primary"
                          onClick={() => openSequencer(sequencer.idSequencer)}
                        >
                          <Link
                            to={`/maintrack/${sequencer.idSequencer}`}
                            onClick={() => openSequencer(sequencer.idSequencer)}
                          >
                            Открыть
                          </Link>
                        </Button>
                        <Typography.Text
                          type="secondary"
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            bottom: "50px",
                            right: "20px",
                          }}
                        >
                          {"Изменено: "}
                          {moment(sequencer.updated).format(
                            "DD MMMM YYYY HH:mm"
                          )}
                        </Typography.Text>
                        <Typography.Text
                          type="secondary"
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            bottom: "30px",
                            right: "20px",
                          }}
                        >
                          {"Создано: "}
                          {moment(sequencer.created).format(
                            "DD MMMM YYYY HH:mm"
                          )}
                        </Typography.Text>
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            </Content>
            <Tour
              open={openTour}
              onClose={() => setOpenTour(false)}
              steps={steps}
            />
          </Layout>
          <FloatButton
            onClick={() => setOpenTour(true)}
            icon={<QuestionCircleOutlined />}
            type="primary"
            style={{ right: 94 }}
          />
        </Layout>
      )}
    </>
  );
};

export default Home;
