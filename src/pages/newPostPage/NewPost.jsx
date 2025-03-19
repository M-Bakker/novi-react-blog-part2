import './NewPost.css';
import {useState} from 'react';
import calculateReadTime from '../../helpers/calculateReadTime.js';
import {useNavigate} from 'react-router-dom';

function NewPost() {
    const [newPost, setNewPost] = useState({
        title: '',
        subtitle: '',
        author: '',
        content: '',
    });

    const navigate = useNavigate();

    function handleChange(e) {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({
            ...setNewPost,
            shares: 0,
            comments: 0,
            created: new Date().toISOString(),
            readTime: calculateReadTime(newPost.content),
        });

        console.log('De blog is succesvol verzameld! 🌈');
        // navigate('/posts');
    }

    return (
        <section className="new-post-section outer-content-container">
            <div className="inner-content-container__text-restriction">
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
                        minLength={300}
                        maxLength={2000}
                        value={newPost.content}
                        onChange={handleChange}></textarea>
                   <button type="submit">
                        Toevoegen
                    </button>
                </form>
            </div>
        </section>
    );
}

export default NewPost;