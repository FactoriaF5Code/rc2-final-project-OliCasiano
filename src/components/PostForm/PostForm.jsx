import "./PostForm.css";
import { useState } from 'react';
import { FaRegImage } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import Post from "./Post";

function PostForm() {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [uploadedPosts, setUploadedPosts] = useState([]);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setImageUploaded(files.length > 0); // Actualiza el estado para reflejar que se ha cargado una imagen
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim() && images.length === 0) {
            setErrorMessage('Debes añadir texto o una imagen antes de publicar.');
            return;
        }
        const newPost = {
            content: content,
            images: images
        };
        setUploadedPosts([...uploadedPosts, newPost]);

        setContent('');
        setImages([]);
        setImageUploaded(false);
        setErrorMessage('');
    };

    return (
        <div className="doc-central-post">
            <section className='header-post-central'>
                <div className='title-central'>
                    <h3>¿Qué estás pensando hoy...</h3>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {/* ...resto del formulario */}

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
                                <FaRegImage className="" />
                            </label>
                            {imageUploaded && (
                                <span className="image-upload-confirmation">
                                    <FaCheckCircle color="green" /> Imagen cargada
                                </span>
                            )}
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
