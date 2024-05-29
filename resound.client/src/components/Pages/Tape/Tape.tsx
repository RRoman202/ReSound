import {
  Card,
  Col,
  Layout,
  Row,
  Segmented,
  Flex,
  Button,
  Input,
  Pagination,
  Dropdown,
  Menu,
  Space,
} from "antd";

import { CloseOutlined } from "@ant-design/icons";
import MusicCard from "./MusicCard";
import MiniMusicCard from "./MiniMusicCard";
import moment from "moment";
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
  const subscriptionOptions = ["Все", "Подписки", "В тренде"];
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedgenres, setSelectedGenres] = useState<string[]>([]);
  const [genreName, setGenreName] = useState(null);
  const [popularitemonth, setPopularitemonth] = useState([]);
  const fetchSequencers = async () => {
    const response = await axios.get("https://localhost:7262/Tracks");
    setTracks(response.data);
    setFilteredTracks(response.data);
  };
  useEffect(() => {
    fetchSequencers();
    fetchPopulariteMonth();
  }, []);

  const changeGenres = async (idgenre: string) => {
    selectedgenres.push(idgenre);
    setSelectedGenres(selectedgenres);

    const response = await axios.get(
      "https://localhost:7262/Tracks/track-by-genre?genres=" +
        selectedgenres.join(",")
    );
    setTracks(response.data);
    setFilteredTracks(response.data);
    getGenreName();
    setSelectedGenres([]);
  };

  const fetchPopulariteMonth = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/popularite-month"
    );
    setPopularitemonth(response.data);
  };

  const fetchPopularite = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/popularite"
    );
    setTracks(response.data);
    setFilteredTracks(response.data);
  };
  const fetchFollowerSequencers = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/Follower?iduser=" +
        localStorage.getItem("userid")
    );
    setTracks(response.data);
    setFilteredTracks(response.data);
  };

  const handleSort = (key: string) => {
    if (key == "1") {
      let sorted = tracks.sort((s1, s2) =>
        moment(s2.publicDate).diff(moment(s1.publicDate))
      );
      setFilteredTracks(sorted.filter((s1) => s1));
    }
    if (key == "2") {
      let sorted = tracks.sort((s1, s2) =>
        moment(s1.publicDate).diff(moment(s2.publicDate))
      );
      setFilteredTracks(sorted.filter((s1) => s1));
    }
  };

  const genres = [
    "Pop",
    "Rock",
    "Hip-hop",
    "Electronic",
    "Classical",
    "Jazz",
    "Country",
  ];

  const getGenreName = async () => {
    const response = await axios.get(
      "https://localhost:7262/Tracks/genre-name?idgenre=" + selectedgenres[0]
    );
    setGenreName(response.data.name);
  };

  const handleSubscriptionChange = (value: string) => {
    if (value == "Подписки") {
      fetchFollowerSequencers();
    } else if (value == "Все") {
      fetchSequencers();
    } else if (value == "В тренде") {
      fetchPopularite();
    }
    setCurrentPage(1);
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
    setCurrentPage(1); // Reset page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!tracks) {
    return <div>Loading...</div>;
  }

  const paginatedFilteredTracks = filteredTracks.slice(
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

            <Card
              title="Треки"
              bordered={false}
              extra={
                <Flex>
                  <p>{genreName}</p>
                  <Button
                    icon={<CloseOutlined></CloseOutlined>}
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                    onClick={() => {
                      setGenreName(null);
                      fetchSequencers();
                    }}
                  ></Button>
                </Flex>
              }
            >
              <Space wrap>
                <Search
                  style={{ marginTop: 20, width: "135.5vh" }}
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
              {paginatedFilteredTracks.map((track) => (
                <MusicCard key={track.name} {...track} />
              ))}
              <Pagination
                style={{ marginTop: "20px" }}
                current={currentPage}
                total={filteredTracks.length}
                pageSize={pageSize}
                onChange={handlePageChange}
              />
            </Card>
          </Col>
          <Col span={6} style={{ marginTop: "40px" }}>
            <Flex gap="small" align="flex-start" vertical>
              <Flex gap="small">
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("aaeaa8ab-ff7e-4b03-abe5-ced849477a64")
                  }
                >
                  Рок
                </Button>
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("a26454e5-c24c-45be-b13b-b35bc9bf20e6")
                  }
                >
                  Поп
                </Button>
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("6edcca69-38d5-4585-a656-dae75b10ed66")
                  }
                >
                  Хип-хоп
                </Button>
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("dee04dc9-44d5-4fec-9420-76da44f1ba22")
                  }
                >
                  Джаз
                </Button>
              </Flex>
              <Flex gap="small">
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("1896b605-ec30-4934-9f0c-02fde1b82b1d")
                  }
                >
                  Электронная
                </Button>
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("150805fd-a799-4c0d-86bd-d9615d6ff61b")
                  }
                >
                  Классическая
                </Button>
              </Flex>
              <Flex gap="small">
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("05143832-c84d-4182-be93-d1e3d8c99763")
                  }
                >
                  Блюз
                </Button>
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("812fca01-1f40-4b8d-8891-23678a8610b9")
                  }
                >
                  Металл
                </Button>
                <Button
                  shape="round"
                  onClick={() =>
                    changeGenres("3e7def6f-73a7-4f88-a778-b3de8af695b1")
                  }
                >
                  Кантри
                </Button>
              </Flex>
            </Flex>

            <Card
              title="Популярные треки за месяц"
              bordered={false}
              style={{ marginTop: "20px" }}
            >
              {popularitemonth.map((track) => (
                <MiniMusicCard key={track.name} {...track} />
              ))}
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
