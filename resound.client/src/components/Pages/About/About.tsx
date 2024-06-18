import React from "react";
import { Badge, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import logo from "./logo.png";

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Название проекта",
    children: "ReSound",
  },
  {
    key: "2",
    label: "Тема проекта",
    children:
      "Онлайн сервис для создания и прослушивания музыкальных произведений",
  },
  {
    key: "3",
    label: "Создатель",
    children: "Красильников Роман Арсеньевич",
  },
];

const items2: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Описание",
    children:
      "Это веб-приложение, которое позволяет создавать мелодии, добавлять инструменты, а также сохранять и делиться своими произведениями. Изучите интерфейс сайта. Познакомьтесь с основными функциями, такими как размещение нот и сохранение шаблонов. Начинайте с простых проектов. Не пытайтесь сразу создавать сложные композиции. Начните с простых проектов, которые помогут вам освоить основные принципы создания музыки. Вы можете использовать готовые шаблоны или лупы, чтобы сэкономить время и силы. Постепенно усложняйте свои проекты, добавляя новые инструменты. Не бойтесь делиться своей музыкой с другими людьми и получать обратную связь.",
  },
];

export const About = () => {
  return (
    <div style={{ padding: "80px" }}>
      <Descriptions
        title="Информация о нас"
        labelStyle={{
          color: "white",
          fontWeight: "bold",
          backgroundColor: "#1677ff",
        }}
        bordered
        items={items}
      />
      <Descriptions
        labelStyle={{
          color: "white",
          fontWeight: "bold",
          backgroundColor: "#1677ff",
        }}
        style={{ marginTop: "40px" }}
        bordered
        items={items2}
      />
      <img
        src={logo}
        style={{
          height: "250px",
          position: "absolute",
          left: "40%",

          pointerEvents: "none",
        }}
      ></img>
    </div>
  );
};
