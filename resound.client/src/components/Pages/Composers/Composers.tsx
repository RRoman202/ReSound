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
  Pagination,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import ComposerCard from "./ComposerCard";
import MiniComposerCard from "./MiniComposerCard";
import "./Tape.css";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

interface User {
  login: string;
  email: string;
  avatar: string;
  genres: string[];
  idUser: number;
}

interface ComposersProps {}

const Composers: React.FC<ComposersProps> = () => {
  const subscriptionOptions = ["Все", "Подписки", "В тренде"];

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [popularitemonth, setPopularitemonth] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("https://localhost:7262/Users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    };
    fetchUsers();
    fetchPopulariteMonth();
  }, []);

  const fetchPopulariteMonth = async () => {
    const response = await axios.get(
      "https://localhost:7262/Users/popularite-month"
    );
    setPopularitemonth(response.data);
  };

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

  const populariteUser = async () => {
    const response = await axios.get(`https://localhost:7262/Users/popularite`);
    setUsers(response.data);
    setFilteredUsers(response.data);
  };

  const handleSubscriptionChange = (value: string) => {
    if (value == "Подписки") {
      followerUser();
    } else if (value == "Все") {
      allUser();
    } else if (value == "В тренде") {
      populariteUser();
    }
    setCurrentPage(1); // Reset page on subscription change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = users.filter((user) =>
      user.login.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!users) {
    return <Spin size="large" fullscreen></Spin>;
  }

  const paginatedFilteredUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
              {paginatedFilteredUsers.map((user) => (
                <ComposerCard key={user.login} {...user} />
              ))}
              <Pagination
                style={{ marginTop: "20px" }}
                current={currentPage}
                total={filteredUsers.length}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginTop: "20px" }}>
            <Card
              title="Популярные пользователи за месяц"
              bordered={false}
              style={{ marginTop: "20px" }}
            >
              <Row justify="space-between">
                {popularitemonth.map((user) => (
                  <MiniComposerCard key={user.login} {...user} />
                ))}
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
