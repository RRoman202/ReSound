import { Card, Layout, Segmented } from "antd";
import MusicCard from "./MusicCard";
import "./Tape.css";

const { Header, Content, Footer } = Layout;

const Tape = () => {
  return (
    <Layout style={{ alignItems: "center", backgroundColor: "#001529" }}>
      <Header>
        <Segmented<string>
          options={["Подписки", "В тренде", "Для тебя"]}
          onChange={(value) => {
            console.log(value); // string
          }}
        />
      </Header>
      <Content>
        <MusicCard
          title="My Awesome Track"
          artist="Your Name"
          cover="https://via.placeholder.com/128x128"
          audioSrc="https://www.bensound.com/royalty-free-music/track/funky-element"
          likes={100}
          rating={4.5}
        />
        <MusicCard
          title="My Awesome Track"
          artist="Your Name"
          cover="https://via.placeholder.com/128x128"
          audioSrc="https://www.bensound.com/royalty-free-music/track/funky-element"
          likes={100}
          rating={4.5}
        />
        <MusicCard
          title="My Awesome Track"
          artist="Your Name"
          cover="https://via.placeholder.com/128x128"
          audioSrc="https://www.bensound.com/royalty-free-music/track/funky-element"
          likes={100}
          rating={4.5}
        />
        <MusicCard
          title="My Awesome Track"
          artist="Your Name"
          cover="https://via.placeholder.com/128x128"
          audioSrc="https://www.bensound.com/royalty-free-music/track/funky-element"
          likes={100}
          rating={4.5}
        />
      </Content>
    </Layout>
  );
};

export default Tape;
