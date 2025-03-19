import './Overview.css';
import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from 'axios';

function Overview() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {setLoading(false);}
    }

    useEffect(() => {
        void fetchPosts();
    },[]);

    return (
        <div>
            {error && <p>Helaas is het volgende fout gegaan tijdens het ophalen van de gegevens: {error}</p>}
            <section className="overview-section outer-content-container">
                <div className="inner-content-container">
                    <h1>Bekijk alle {posts.length} posts op het platform</h1>
                    {loading ? (<p>Laden..</p>) :
                    <ul className="post-list">
                        {posts.map((post) => {
                            return <li key={post.id} className="post-item">
                                <h2 className="post-title"><Link
                                    to={`http://localhost:5173/posts/${post.id}`}>{post.title}</Link> ({post.author})</h2>
                                <p>{post.comments} reacties - {post.shares} keer gedeeld</p>
                            </li>
                        })}
                    </ul>}
                </div>
            </section>
        </div>
    );
}

export default Overview;