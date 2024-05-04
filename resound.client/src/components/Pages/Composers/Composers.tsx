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

interface Track {
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
  likes: number;
  rating: number;
  avatar: string; // Add avatar prop
  login: string; // Add login prop
  genres: string[]; // Add genres prop
}

interface TapeProps {}

const Composers: React.FC<TapeProps> = () => {
  const subscriptionOptions = ["Все", "Подписки", "В тренде", "Для тебя"];

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get("https://localhost:7262/Users");
      setUsers(response.data);
    };
    fetchSequencers();
  }, []);

  const popularTracks: Track[] = [
    {
      title: "My Awesome Track",
      artist: "Your Name",
      cover: "https://via.placeholder.com/128x128",
      audioSrc:
        "https://www.bensound.com/royalty-free-music/track/funky-element",
      likes: 100,
      rating: 4.5,
      avatar: "https://via.placeholder.com/64x64", // Placeholder avatar
      login: "Composer123", // Placeholder login
      genres: ["Electronic", "Pop"], // Placeholder genres
    },
    {
      title: "My Awesome Track",
      artist: "Your Name",
      cover: "https://via.placeholder.com/128x128",
      audioSrc:
        "https://www.bensound.com/royalty-free-music/track/funky-element",
      likes: 100,
      rating: 4.5,
      avatar: "https://via.placeholder.com/64x64", // Placeholder avatar
      login: "Composer456", // Placeholder login
      genres: ["Rock", "Indie"], // Placeholder genres
    },
    {
      title: "My Awesome Track",
      artist: "Your Name",
      cover: "https://via.placeholder.com/128x128",
      audioSrc:
        "https://www.bensound.com/royalty-free-music/track/funky-element",
      likes: 100,
      rating: 4.5,
      avatar: "https://via.placeholder.com/64x64", // Placeholder avatar
      login: "Composer456", // Placeholder login
      genres: ["Rock", "Indie"], // Placeholder genres
    },
    {
      title: "My Awesome Track",
      artist: "Your Name",
      cover: "https://via.placeholder.com/128x128",
      audioSrc:
        "https://www.bensound.com/royalty-free-music/track/funky-element",
      likes: 100,
      rating: 4.5,
      avatar: "https://via.placeholder.com/64x64", // Placeholder avatar
      login: "Composer456", // Placeholder login
      genres: ["Rock", "Indie"], // Placeholder genres
    },
  ];

  const handleSubscriptionChange = (value: string) => {
    console.log(`Selected subscription: ${value}`);
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
              <Search placeholder="Поиск пользователей" enterButton />
              {users.map((user) => (
                <ComposerCard key={user.title} {...user} /> // ComposerCard instead of MusicCard
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
