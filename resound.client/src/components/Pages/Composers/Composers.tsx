import {
  Card,
  Col,
  Layout,
  Row,
  Segmented,
  Flex,
  Button,
  Input,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import ComposerCard from "./ComposerCard";
import "./Tape.css";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

interface User {
  login: string;
  email: string;
  avatar: string;
  genres: string[];
  idUser: number;
  // Add other user properties as needed
}

interface ComposersProps {}

const Composers: React.FC<ComposersProps> = () => {
  const subscriptionOptions = ["Все", "Подписки", "В тренде", "Для тебя"];

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("https://localhost:7262/Users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    };
    fetchUsers();
  }, []);

  const allUser = async () => {
    const response = await axios.get("https://localhost:7262/Users");
    setUsers(response.data);
    setFilteredUsers(response.data);
  };

  const followerUser = async () => {
    const response = await axios.get(
      `https://localhost:7262/Users/Follower?iduser=` +
        localStorage.getItem("userid")
    );
    setUsers(response.data);
    setFilteredUsers(response.data);
  };

  const handleSubscriptionChange = (value: string) => {
    if (value == "Подписки") {
      followerUser();
    } else if (value == "Все") {
      allUser();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = users.filter((user) =>
      user.login.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  if (!users) {
    return <Spin size="large" fullscreen></Spin>;
  }

  return (
    <Layout style={{ padding: "20px" }}>
      <Content>
        <Row gutter={16}>
          <Col span={18}>
            <Segmented
              options={subscriptionOptions}
              onChange={handleSubscriptionChange}
              size="large"
            />

            <Card title="Пользователи" bordered={false}>
              <Search
                placeholder="Поиск пользователей"
                enterButton
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {filteredUsers.map((user) => (
                <ComposerCard key={user.login} {...user} />
              ))}
            </Card>
          </Col>
          <Col span={6} style={{ marginTop: "20px" }}>
            <Card
              title="Популярные пользователи за месяц"
              bordered={false}
              style={{ marginTop: "20px" }}
            >
              <Row justify="space-between">
                <Col span={24}></Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Composers;
