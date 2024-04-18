import "./PostForm.css";
import { useState, useEffect } from 'react';
import { FaRegImage } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import Post from "./Post";
import axios from "axios";
import { useAuthenticationContext } from '../../authentication/AuthenticationProvider';

function PostForm() {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [uploadedPosts, setUploadedPosts] = useState([]);
    const [imageUploaded, setImageUploaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { getAuthenticationHeader } = useAuthenticationContext();


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const headers = getAuthenticationHeader();
            const response = await axios.get('http://localhost:8080/api/posts', { headers });
            setUploadedPosts(response.data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setErrorMessage('No se pudieron cargar las publicaciones.');
        }
    };
    

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setImageUploaded(files.length > 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim() && images.length === 0) {
            setErrorMessage('Debes añadir texto o una imagen antes de publicar.');
            return;
        }

        const formData = new FormData();
        formData.append('content', content);
        images.forEach(image => {
            formData.append('file', image);
        });

        const headers = {
            ...getAuthenticationHeader(),
            'Content-Type': 'multipart/form-data'
        };
        try {
            await axios.post('http://localhost:8080/api/posts', formData, { headers });
            fetchPosts(); // Refetch posts after adding
            setContent('');
            setImages([]);
            setImageUploaded(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Error al crear el post:', error);
            setErrorMessage('Error al publicar. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="doc-central-post">
            <section className='header-post-central'>
                <div className='title-central'>
                    <h3>¿Qué estás pensando hoy?</h3>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                                <FaRegImage />
                            </label>
                            {imageUploaded && (
                                <span className="image-upload-confirmation">
                                    <FaCheckCircle color="green" /> Imagen cargada
                                </span>
                            )}
                        </div>
                        <button className='button-add-post' type="submit">Añadir Post</button>
                    </form>
                </div>
                <hr />
            </section>
            <div className="post-content">
                <h1>Ultimas Publicaciones</h1>
                {uploadedPosts.map((post, index) => (
                    <Post key={index} content={post.content} images={post.imagePath ? [post.imagePath] : []} />
                ))}
            </div>
        </div>
    );
}

export default PostForm;