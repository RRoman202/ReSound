import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, Flex } from "antd";
import * as Tone from "tone";
import { getSounds } from "./FetchData/GetSounds";
import { getCategories } from "./FetchData/GetCategories";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
export let url: string = "https://localhost:7262/audio/";
export let filename: string = "Piano.mp3";

function playExample(url: string, filename: string) {
  const player = new Tone.Player(url + filename).toDestination();
  Tone.loaded().then(() => {
    player.start();
  });
}
function ChooseSoundFunction() {
  const [sounds, setSounds] = useState([]);
  const [categories, setCategories] = useState([]);

  const ChooseSound = (sound: string) => {
    if (sound) {
      url = "https://localhost:7262/audio/";
      filename = sound + ".mp3";
      playExample(url, sound + ".mp3");
    } else {
      console.warn(`Sound "${sound}" is invalid or missing a filename.`);
    }
  };

  const getCategoriesSounds = async (category: string) => {
    const response = await axios.get(
      `https://localhost:7262/Files/categories-files?category=` + category
    );
    setSounds(response.data);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getSounds();
        const cat = await getCategories();
        getCategoriesSounds("Пианино");
        setCategories(cat);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const customLabels = categories;

  const itemsMenu = customLabels.map((label, index) => ({
    key: label,

    label: label,
  }));
  return (
    <Layout>
      <Sider>
        <Menu
          defaultSelectedKeys={["Пианино"]}
          items={itemsMenu.reverse()}
          onSelect={(e) => getCategoriesSounds(e.key)}
        />
      </Sider>
      <Flex vertical gap="small" style={{ width: "300px" }}>
        {sounds.map((sound: string) => (
          <Button type="primary" onClick={() => ChooseSound(sound)}>
            {sound}
          </Button>
        ))}
      </Flex>
    </Layout>
  );
}

export default ChooseSoundFunction;
