import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "antd";
import AudioPlayer from "react-audio-player";
import moment from "moment";

interface TrackCardProps {
  idSequencer: string;
  sequencerName: string;
  idUser: string;
  created: string;
  color: string;
  textcolor: string;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  idSequencer,
  sequencerName,
  idUser,
  created,
  color,
  textcolor,
}) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchSequencers = async () => {
      const response = await axios.get(
        "https://localhost:7262/Users/" + idUser
      );
      setUser(response.data);
    };
    fetchSequencers();
  }, []);
  if (!user) {
    return null;
  }
  return (
    <div
      className="card-project"
      style={{
        backgroundColor: color,
        borderRadius: "20px",
        textAlign: "center",
        padding: "20px",
        height: "240px",
      }}
    >
      <div>
        <img
          src={`https://localhost:7262/Files/cover?idsequencer=` + idSequencer}
          style={{
            height: "50px",

            pointerEvents: "none",
          }}
        ></img>
      </div>

      <Typography.Text style={{ color: textcolor }}>
        {sequencerName}
      </Typography.Text>
      <div>
        <Typography.Text type="secondary" style={{ color: textcolor }}>
          {user.login}
        </Typography.Text>
      </div>

      <AudioPlayer
        style={{
          marginTop: "10px",
          width: "100%",
        }}
        src={`https://localhost:7262/track/` + idSequencer}
        autoPlay={false}
        controls
      />
      <Typography.Text type="secondary" style={{ color: textcolor }}>
        {moment(created).format("DD MMMM YYYY HH:mm")}
      </Typography.Text>
    </div>
  );
};
