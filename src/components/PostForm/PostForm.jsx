import "./PostForm.css";
import { useState } from 'react';
import { FaRegImage } from "react-icons/fa6";
import { FaThumbsUp, FaComment } from 'react-icons/fa';

function Post({ content, images }) {

    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };
    return (
        <div className="post-container">
            <div className="post">
                <p>{content}</p>
                <div className="post-images">
                    {images.map((image, index) => (
                        <img key={index} src={URL.createObjectURL(image)} alt={`Uploaded Image ${index}`} />
                    ))}
                </div>
                {/* Aquí puedes añadir botones como "Me gusta" y "Comentar" */}
                <div className="post-actions">
                    <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                        <FaThumbsUp /> Me gusta
                    </button>
                    <button className="comment-button"><FaComment /> Comentar</button>
                </div>
            </div>
        </div>
    );
}


function PostForm() {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [uploadedPosts, setUploadedPosts] = useState([]);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            content: content,
            images: images
        };
        setUploadedPosts([...uploadedPosts, newPost]);

        setContent('');
        setImages([]);
    };

    return (
        <div className="doc-central-post">
            <section className='header-post-central'>
                <div className='title-central'>
                    <h3>¿Qué estás pensando hoy...</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            className='wrapper-input-post-feed'
                            type="text"
                            value={content}
                            onChange={handleContentChange}
                            placeholder="Escribe tu publicación aquí..."
                        />
                        <div>
                            <label className="wrapper-button-add-image">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                                <FaRegImage className=""/>
                            </label>
                        </div>
                        <button className='button-add-post' type="submit" onClick={handleSubmit}>Añadir Post</button>
                    </form>
                </div>
                <hr />
            </section>
            <div className="post-content">
                <h1>Ultimas Publicaciones</h1>
                {uploadedPosts.map((post, index) => (
                    <Post key={index} content={post.content} images={post.images} />
                ))}
            </div>
        </div>
    );
}

export default PostForm;
