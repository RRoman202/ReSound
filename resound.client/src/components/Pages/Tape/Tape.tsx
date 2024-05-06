import {
  Card,
  Col,
  Layout,
  Row,
  Segmented,
  Flex,
  Button,
  Input,
  Drawer,
} from "antd";
import MusicCard from "./MusicCard";
import "./Tape.css";
import { useState, useEffect } from "react";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

interface Track {
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
  likes: number;
  rating: number;
}

interface TapeProps {}

const Tape: React.FC<TapeProps> = () => {
  const subscriptionOptions = ["Все", "Подписки", "В тренде", "Для тебя"];
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get("https://localhost:7262/Tracks");
      setTracks(response.data);
      setFilteredTracks(response.data);
    };
    fetchSequencers();
  }, []);

  const genres = [
    "Pop",
    "Rock",
    "Hip-hop",
    "Electronic",
    "Classical",
    "Jazz",
    "Country",
  ];

  const handleSubscriptionChange = (value: string) => {
    console.log(`Selected subscription: ${value}`);
  };

  const handleGenreChange = (value: string) => {
    console.log(`Selected genre: ${value}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = tracks.filter((track) =>
      track.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTracks(filtered);
  };

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

            <Card title="Треки" bordered={false}>
              <Search
                placeholder="Поиск музыкальных произведений"
                enterButton
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {filteredTracks.map((track) => (
                <MusicCard key={track.name} {...track} />
              ))}
            </Card>
          </Col>
          <Col span={6} style={{ marginTop: "40px" }}>
            <Flex gap="small" align="flex-start" vertical>
              <Flex gap="small">
                <Button shape="round">Рок</Button>
                <Button shape="round">Поп</Button>
                <Button shape="round">Хип-хоп</Button>
                <Button shape="round">Джаз</Button>
              </Flex>
              <Flex gap="small">
                <Button shape="round">Электронная</Button>
                <Button shape="round">Классическая</Button>
              </Flex>
              <Flex gap="small">
                <Button shape="round">Блюз</Button>
                <Button shape="round">Металл</Button>
                <Button shape="round">Кантри</Button>
              </Flex>
            </Flex>

            <Card
              title="Популярные треки за месяц"
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

export default Tape;
