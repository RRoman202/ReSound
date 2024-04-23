import { Card, Col, Layout, Row, Segmented, Flex, Button, Input } from "antd";
import MusicCard from "./MusicCard";
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
}

interface TapeProps {}

const Tape: React.FC<TapeProps> = () => {
  const subscriptionOptions = ["Подписки", "В тренде", "Для тебя"];
  const genres = [
    "Pop",
    "Rock",
    "Hip-hop",
    "Electronic",
    "Classical",
    "Jazz",
    "Country",
  ];

  const popularTracks: Track[] = [
    {
      title: "My Awesome Track",
      artist: "Your Name",
      cover: "https://via.placeholder.com/128x128",
      audioSrc:
        "https://www.bensound.com/royalty-free-music/track/funky-element",
      likes: 100,
      rating: 4.5,
    },
    {
      title: "My Awesome Track",
      artist: "Your Name",
      cover: "https://via.placeholder.com/128x128",
      audioSrc:
        "https://www.bensound.com/royalty-free-music/track/funky-element",
      likes: 100,
      rating: 4.5,
    },
  ];

  const handleSubscriptionChange = (value: string) => {
    console.log(`Selected subscription: ${value}`);
  };

  const handleGenreChange = (value: string) => {
    console.log(`Selected genre: ${value}`);
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
              />
              {popularTracks.map((track) => (
                <MusicCard key={track.title} {...track} />
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
