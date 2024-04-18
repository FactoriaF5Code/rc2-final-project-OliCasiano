import React, { useState } from 'react';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import "./PostForm.css";

function Post({ content, imagePath, userName }) {
    const [liked, setLiked] = useState(false);
    const [fullSizeImage, setFullSizeImage] = useState(null);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleImageClick = () => {
        setFullSizeImage(imagePath);
    };

    const closeFullSizeImage = () => {
        setFullSizeImage(null);
    };

    const formattedImagePath = imagePath.replace(/\\/g, '/').replace(/\s/g, '%20');

    return (
        <div className="post-container">
            <div className="post-header">
                <strong>{userName}</strong> {/* Muestra el nombre del usuario aquí */}
            </div>
            <div className="post">
                <p>{content}</p>
                {imagePath && (
                    <div className="post-images" onClick={handleImageClick}>
                        <img
                            src={`http://localhost:8080/uploads/${formattedImagePath}`}
                            alt="Uploaded by user"
                        />
                    </div>
                )}
                <div className="post-actions">
                    <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                        <FaThumbsUp /> Me gusta
                    </button>
                    <button className="comment-button"><FaComment /> Comentar</button>
                </div>
            </div>
            {fullSizeImage && (
                <div className="modal" onClick={closeFullSizeImage}>
                    <img src={`http://localhost:8080/${formattedImagePath}`} alt="Uploaded by user" />

                </div>
            )}
        </div>
    );
}

export default Post;
