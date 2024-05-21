import { Modal, Button } from "antd";
import React, { useState } from "react";
import ChooseSoundFunction from "../chooseSound";
import { url, filename } from "../chooseSound";
import { BaseUrl } from "../../../../player/playSound";

interface soundProps {
  idsound: string;
  setFileNameSound: (name: string) => void;
  fileNameSound: string;
  idtemplate: string;
}

const ModalChooseSound: React.FC<soundProps> = ({
  idsound,
  setFileNameSound,
  fileNameSound,
  idtemplate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        className="choose-sound-button"
        onClick={showModal}
      >
        Выбрать звук
      </Button>
      <Modal
        title="Выбор звука"
        open={isModalOpen}
        okText="Ок"
        cancelText="Отмена"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ChooseSoundFunction
          idtemplate={idtemplate}
          idsound={idsound}
          setFileNameSound={setFileNameSound}
          fileNameSound={fileNameSound}
        ></ChooseSoundFunction>
      </Modal>
      <BaseUrl url={url} filename={fileNameSound}></BaseUrl>
    </>
  );
};

export default ModalChooseSound;
