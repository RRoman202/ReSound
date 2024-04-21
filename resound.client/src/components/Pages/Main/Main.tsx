import Layout from "antd/es/layout/layout";
import React from "react";
import { Carousel, Flex, Space, Button } from "antd";
import background from "./background.png";
import "./Main.css";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "360px",
  textAlign: "center",
  background: "#364d79",
};

const Main = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div style={{ backgroundColor: "black" }}>
      <Layout style={{ alignItems: "center", backgroundColor: "black" }}>
        <div style={{ position: "absolute", backgroundColor: "black" }}>
          <img
            src={background}
            style={{
              width: "218.4vh",
              filter: "blur(10px)",
              pointerEvents: "none",
              backgroundColor: "black",
            }}
          ></img>
        </div>

        <h1 style={{ fontSize: "50px", zIndex: "2", color: "white" }}>
          ReSound
        </h1>
        <h2 style={{ fontSize: "30px", zIndex: "2", color: "white" }}>
          Создайте свою музыку прямо сейчас!
        </h2>

        <Button
          type="primary"
          style={{ width: "300px", height: "50px", fontSize: "25px" }}
        >
          Начать
        </Button>
      </Layout>
      <Layout>
        <Carousel
          style={{
            marginTop: "300px",
            height: "300px",
            backgroundColor: "black",
          }}
          afterChange={onChange}
          autoplay
        >
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </Layout>
    </div>
  );
};

export default Main;
