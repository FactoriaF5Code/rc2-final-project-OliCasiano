import React, { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import "./PostForm.css";

function Post({ content, images }) {
    const [liked, setLiked] = useState(false);
    const [fullSizeImage, setFullSizeImage] = useState(null);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleImageClick = (image) => {
        setFullSizeImage(image);
    };

    const closeFullSizeImage = () => {
        setFullSizeImage(null);
    };

    return (
        <div className="post-container">
            <div className="post">
                <p>{content}</p>
                <div className="post-images">
                {images.map((image, index) => (
                    <img 
                        key={index} 
                        src={URL.createObjectURL(image)} 
                        alt={`Uploaded by user`} 
                        onClick={() => handleImageClick(image)}
                    />
                ))}
            </div>
                <div className="post-actions">
                    <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                        <FaThumbsUp /> Me gusta
                    </button>
                    <button className="comment-button"><FaComment /> Comentar</button>
                </div>
            </div>
            {fullSizeImage && (
                <div className="modal" onClick={closeFullSizeImage}>
                    <img src={URL.createObjectURL(fullSizeImage)} alt="Full size" />
                </div>
            )}
        </div>
    );
}

export default Post;
