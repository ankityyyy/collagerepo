import React, { useState } from "react";
import "./App.css";
import GalleryModal from "./landingpage/GalleryModal";

const categories = [
  {
    name: "Team Vibes 🤝",
    type: "image",
    media: ["/images/team1.jpg"],
  },
  {
    name: "Work Hard, Play Hard 🥳",
    type: "image",
    media: ["/images/work1.jpg",],
  },
  {
    name: "Behind-The-Scenes 🎥",
    type: "video",
    media: ["/videos/behind1.mp4"],
  },
  {
    name: "More Fun 😎",
    type: "image",
    media: ["/images/fun1.jpg"],
  },
];

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="app">
      <div style={{display:"flex", gap:"4px", alignItems:"center", justifyContent:"center"}}>
 <div class="animated-word start">📸 CollegeTips</div>
   <div class="animated-word end">Moments</div> 
      </div>
     
      <button className="view-button">Click to See Photos</button>

      <div className="gallery">
        {categories.map((cat, i) => (
          <div key={i} className="category">
            <h2>{cat.name}</h2>
            <div className="media">
              {cat.media.map((src, j) =>
                cat.type === "image" ? (
                  <img
                    key={j}
                    src={src}
                    alt={cat.name}
                    onClick={() => setSelectedImg(src)}
                    className="gallery-image"
                  />
                ) : (
                  <video
                    key={j}
                    src={src}
                    controls
                    width="250"
                    style={{ margin: "10px", borderRadius: "10px" }}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <GalleryModal src={selectedImg} onClose={() => setSelectedImg(null)} />
      )}
    </div>
  );
}

export default App;
