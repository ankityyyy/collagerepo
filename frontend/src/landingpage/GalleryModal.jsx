import React from "react";
import "../landingpage/GalleryModal.jsx";
import "../style/Gallery.css"

function GalleryModal({ src, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <img src={src} alt="Full View" />
    </div>
  );
}

export default GalleryModal;
