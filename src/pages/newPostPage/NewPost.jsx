import './NewPost.css';
import {useState} from 'react';
import calculateReadTime from '../../helpers/calculateReadTime.js';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function NewPost() {
    const [newPost, setNewPost] = useState({
        title: '',
        subtitle: '',
        author: '',
        content: '',
    });

    const [success, setSuccess] = useState(false);
    const [postId, setPostId] = useState(null);
    const [error, setError] = useState(null);

    function handleChange(e) {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.subtitle || !newPost.author || !newPost.content) return;
        const postData = {
            ...newPost,
            shares: 0,
            comments: 0,
            created: new Date().toISOString(),
            readTime: calculateReadTime(newPost.content),
        };
        try {
            const response = await axios.post('http://localhost:3000/posts/', postData);
            const newPostId = response.data.id;
            setPostId(newPostId);
            setSuccess(true);
        } catch (err){
            setError(err.message);
            console.error('Er is iets mis gegaan bij het verzenden van de post:', err);
        }
    }

    return (
        <section className="new-post-section outer-content-container">
            <div className="inner-content-container__text-restriction">
                {error && <p>Helaas is het volgende fout gegaan tijdens het ophalen van de gegevens: {error}</p>}
                {success ? (
                    <div>
                        <h1>De blogpost is succesvol toegevoegd!</h1>
                        <p>Je kunt deze hier <a href={`/posts/${postId}`}>bekijken</a>.</p>
                    </div>) : (
                    <form className="new-post-form" onSubmit={handleSubmit}>
                        <h1>Post toevoegen</h1>
                        <label htmlFor="post-title">Titel</label>
                        <input
                            type="text"
                            id="post-title"
                            name="title"
                            required
                            value={newPost.title}
                            onChange={handleChange}
                        />
                        <label htmlFor="post-subtitle">Subtitle</label>
                        <input
                            type="text"
                            id="post-subtitle"
                            name="subtitle"
                            required
                            value={newPost.subtitle}
                            onChange={handleChange}
                        />
                        <label htmlFor="post-author">Naam en achternaam</label>
                        <input
                            type="text"
                            id="post-author"
                            name="author"
                            required
                            value={newPost.author}
                            onChange={handleChange}
                        />
                        <label htmlFor="post-content">Blogpost</label>
                        <textarea
                            name="content"
                            id="post-content"
                            cols="30"
                            rows="10"
                            required
                            minLength={200}
                            maxLength={2000}
                            value={newPost.content}
                            onChange={handleChange}></textarea>
                        <button type="submit">
                            Toevoegen
                        </button>
                    </form>)}
            </div>
        </section>
    );
}

export default NewPost;