import React, { useEffect, useState, useReducer, useRef } from "react";
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
} from "antd";
import "./Home.css";
import axios from "axios";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const customLabels = ["Проекты", "Любимое", "Статистика"];
const customIcons = [FormOutlined, LikeOutlined, BarChartOutlined];

const itemsMenu = customLabels.map((label, index) => ({
  key: String(index + 1),
  icon: React.createElement(customIcons[index]),
  label: label,
}));

const menu = (
  <Menu>
    <Menu.Item key="1">Редактировать</Menu.Item>
    <Menu.Item key="2">Выход</Menu.Item>
  </Menu>
);

const user = JSON.parse(localStorage.getItem("userfull")!);

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
    <Avatar size={50} icon={<UserOutlined />} />
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
  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get(
        "https://localhost:7262/api/Sequencers?iduser=" +
          localStorage.getItem("userid")
      );
      setSequencers(response.data);
    };
    fetchSequencers();
  }, []);

  const handleDeleteSequencer = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7262/api/Sequencers/${id}`);
      const updatedSequencers = sequencers.filter(
        (sequencer) => sequencer.idSequencer !== id
      );
      setSequencers(updatedSequencers);
    } catch (error) {
      console.error("Error deleting sequencer:", error);
    }
  };
  const openSequencer = async (id: string) => {
    localStorage.setItem("sequencerid", id);
    navigate(`/maintrack/${id}`);
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
        <div ref={ref1}>
          <UserPanel />
        </div>

        <Menu
          className="sidemenu"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
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
              setSequencers={setSequencers}
            ></ModalCreateProject>
          </Card>
          <Title level={4}>Мои музыкальные произведения</Title>
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
              dataSource={sequencers}
              renderItem={(sequencer) => (
                <List.Item ref={ref3}>
                  <Card
                    className="card-project"
                    title={sequencer.name}
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
                              <a target="_blank" rel="noopener noreferrer">
                                Редактировать
                              </a>
                            </Menu.Item>
                            <Menu.Item key="3" danger>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  handleDeleteSequencer(sequencer.idSequencer)
                                }
                              >
                                Удалить
                              </a>
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button icon={<MoreOutlined></MoreOutlined>}></Button>
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
  );
};

export default Home;
