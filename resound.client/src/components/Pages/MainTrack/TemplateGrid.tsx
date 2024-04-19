import React from "react";
import { Card, Layout, Radio, Tooltip } from "antd";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import "./MainTrack.css";
import CanvasTimeSignature from "../../sequencer/ui/TimeSignatureBar";
import { EditOutlined, RadiusUprightOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const AudioTrackGrid: React.FC = () => {
  const [, drop] = useDrop({
    accept: ItemTypes.TEMPLATE,
    drop: (item: any) => {
      // Обработка события перетаскивания элемента на сетку
      console.log("Template dropped:", item.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Card
      headStyle={{ backgroundColor: "#1677ff", color: "white" }}
      title="Секвенсор"
      style={{ height: "100%" }}
      bodyStyle={{ padding: 0 }}
      className="CardGrid"
    >
      <Layout>
        <div className="headerMain">
          <Radio.Group defaultValue="a" buttonStyle="solid" size="small">
            <Radio.Button value="a">
              <Tooltip title="Карандаш">
                <EditOutlined></EditOutlined>
              </Tooltip>
            </Radio.Button>
            <Radio.Button value="b">
              <Tooltip title="Выделение">
                <RadiusUprightOutlined />
              </Tooltip>
            </Radio.Button>
          </Radio.Group>
        </div>
        <div style={{ marginLeft: "95px" }}>
          <CanvasTimeSignature
            width={900}
            height={15}
            spacing={160}
          ></CanvasTimeSignature>
        </div>

        <div
          ref={drop}
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr 1fr 1fr 1fr",
            gridGap: "2px",
          }}
        >
          {[...Array(16)].map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div
                style={{
                  gridRow: `${rowIndex + 1}`,
                  gridColumn: "1",
                  background: "lightblue",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                Дорожка {rowIndex + 1}
              </div>

              {[...Array(4)].map((_, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    gridRow: `${rowIndex + 1}`,
                    gridColumn: `${colIndex + 2}`,

                    border: "1px solid #ccc",
                    height: "50px",
                  }}
                  className="GridMainTrack"
                ></div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Layout>
    </Card>
  );
};

export default AudioTrackGrid;
