import React from "react";


export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);
  const [undoImg,setUndoImg] = React.useState([])

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    
    setUndoImg((prevUndoImg) => [...prevUndoImg, { ...meme }]);

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
    
  }
  
  function undoImage(){
    console.log(undoImg)
    // Check if there are previous images in the undoImg array
    if (undoImg.length > 0) {
      // Get the last image from undoImg and set it as the current image
      const lastImage = undoImg[undoImg.length - 1];
      setMeme(lastImage);

      // Remove the last image from undoImg
      setUndoImg((prevUndoImg) => prevUndoImg.slice(0, -1));
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
        <button className="form--button" onClick={undoImage}>
          Undo Image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
