import "./PostForm.css";
import { useState } from 'react';


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
        // Lógica para enviar el contenido del post y las imágenes al backend
        // Aquí se podría realizar una solicitud al backend para guardar el post con la imagen

        // Añadir el post subido a la lista de posts
        const newPost = {
            content: content,
            images: images
        };
        setUploadedPosts([...uploadedPosts, newPost]);

        // Limpiar los campos después de enviar el post
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
                            className='wrapper-input-post'
                            type="text"
                            value={content}
                            onChange={handleContentChange}
                            placeholder="Escribe tu publicación aquí..."
                        />
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <button className='button-add-post' type="submit" onClick={handleSubmit}>Añadir Post</button>

                    </form>
                </div>
            </section>
            <div className="post-content">
                <h1>Post subidos</h1>
                {uploadedPosts.map((post, index) => (
                    <div key={index}>
                        <p>{post.content}</p>
                        {post.images.map((image, imageIndex) => (
                            <img key={imageIndex} src={URL.createObjectURL(image)} alt={`Uploaded Image ${imageIndex}`} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostForm;
