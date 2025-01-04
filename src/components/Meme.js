import React from "react";

export default function Meme() {
    function handleGenerateMeme(e) {
        e.preventDefault();
        let randomNumber = Math.floor(Math.random() * allMemeImages.length);
        setMeme(prev => (
                {
                    ...prev,
                    randomImage: allMemeImages[randomNumber].url
                }
            ));
        console.log(meme);
    }

    function handleTextChange(e) {
        const {name, value} = e.target;
        setMeme(prev => ({
            ...prev,
            [name]: value
        }));
    }

    let [allMemeImages, setAllMemeImages]= React.useState([]);

    let [meme, setMeme] = React.useState({
            topText: "",
            bottomText: "",
            randomImage: "https://i.imgflip.com/1bij.jpg"
        });

    React.useEffect(() => {
        async function fetchMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemeImages(data.data.memes);
        }
        fetchMemes();
    }, []);


    return (
        <form className="meme" onSubmit={handleGenerateMeme}>
            <div className="meme--user-input">
                <p className="meme--user-input-label">Top text</p>
                <p className="meme--user-input-label">Bottom text</p>
                <input onChange={handleTextChange} className="meme--user-input-top-text" name="topText" placeholder="Top Text" value={meme.topText} />
                <input onChange={handleTextChange} className="meme--user-input-bottom-text" name="bottomText" placeholder="Bottom Text" value={meme.bottomText} />
                <button onClick={handleGenerateMeme} className="meme--user-button">Get a new meme image 🖼️</button>
            </div>
            <div className="meme--meme-generated-container">
                <h1 className="meme--meme-generated-top-text">{meme.topText !== "" && meme.topText}</h1>
                <img className="meme--meme-generated-img" src={meme.randomImage} alt="meme-image" />
                <h1 className="meme--meme-generated-bottom-text">{meme.bottomText !== "" && meme.bottomText}</h1>
            </div>
        </form>
    );
}