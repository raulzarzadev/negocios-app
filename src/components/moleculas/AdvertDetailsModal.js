import MyModal from "../atomos/MyModal";
import React from "react";

export default function AdvertDetailsModal({ open, handleOpen, advert }) {
  console.log(advert);
  return (
    <>
      <MyModal
        title="Detalles de anuncio"
        open={open}
        handleOpenModal={handleOpen}
      >
        Details Modal
      </MyModal>
    </>
  );
}
