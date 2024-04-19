import { Modal, Button } from "antd";
import { useState } from "react";
import ChooseSoundFunction from "../chooseSound";
import { url, filename } from "../chooseSound";
import { BaseUrl } from "../../../../player/playSound";

function ModalChooseSound() {
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
        <ChooseSoundFunction></ChooseSoundFunction>
      </Modal>
      <BaseUrl url={url} filename={filename}></BaseUrl>
    </>
  );
}

export default ModalChooseSound;
