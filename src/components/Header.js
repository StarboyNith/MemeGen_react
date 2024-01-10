import React from "react"
import trollImg from "../components/images/troll-face.png"
export default function Header() {
    
    return (
        <header className="header">
            <img 
                src= {trollImg}
                className="header--image"
            />
            <h2 className="header--title">Meme Generator</h2>
                    </header>
    )
}