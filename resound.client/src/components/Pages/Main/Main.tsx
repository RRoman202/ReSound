import Layout from "antd/es/layout/layout";
import React from "react";
import { Carousel, Flex, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import background from "./background.png";
import "./Main.css";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#1677ff",
};

const { Header, Content, Footer } = Layout;

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
              width: "195vh",
              filter: "blur(10px)",
              pointerEvents: "none",
              backgroundColor: "black",
            }}
          ></img>
        </div>

        <h1
          style={{
            fontSize: "50px",
            zIndex: "2",
            color: "white",
            fontWeight: "bold",
          }}
        >
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
            <h3 style={contentStyle}>
              Создайте собственную музыку при помощи гибко настраиваемого
              секвенсора
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Обширная библиотека звуков для разных жанров музыки
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Сохранение своих работ в файлы аудио формата
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Сохранение своих работ на площадке для дальнейшей работы с ними
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>Публикация своих работ на площадке</h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              Возможность оценивать работы других людей и оставлять комментарии
            </h3>
          </div>
        </Carousel>
      </Layout>
    </div>
  );
};

export default Main;
