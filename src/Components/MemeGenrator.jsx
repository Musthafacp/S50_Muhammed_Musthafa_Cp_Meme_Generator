import React, { useEffect, useState } from "react";

function MemeGenrator() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setAllMemes(data.data.memes);
        getMemeImage(data.data.memes);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const getMemeImage = (memesArray) => {
    if (memesArray.length > 0) {
      const randomNumber = Math.floor(Math.random() * memesArray.length);
      const url = memesArray[randomNumber].url;
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: url,
      }));
    }
  };

  return (
    <div>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className=""
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className=""
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form-button" onClick={() => getMemeImage()}>
          Get a new meme image 🖼
        </button>
      </div>

      <div className="meme">
        {meme.randomImage ? (
          <>
            <h2 className="top-text">{meme.topText}</h2>
            <img src={meme.randomImage} className="meme-image" alt="Meme" />
            <h2 className="bottom-text">{meme.bottomText}</h2>
          </>
        ) : (
          <h2 className="loading">Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default MemeGenrator;
