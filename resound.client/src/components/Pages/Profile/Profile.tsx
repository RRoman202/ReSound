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
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://localhost:7262/Users/${user}`);
      setUserData(response.data);
    };

    fetchUser();
  }, [user]);

  if (!userData) {
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
          </Card>
          <Title level={4}>Музыкальные произведения</Title>
          <Search
            style={{ marginTop: 20 }}
            placeholder="Поиск музыкальных произведений"
            enterButton
          />
          <div>
            <List></List>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
