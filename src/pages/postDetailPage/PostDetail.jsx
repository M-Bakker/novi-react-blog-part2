import {Link, useParams} from 'react-router-dom';
import formatDateString from '../../helpers/formatDateString.js';
import {CaretLeft, Clock} from "@phosphor-icons/react";
import './PostDetail.css';
import axios from "axios";
import {useEffect, useState} from "react";

function PostDetails () {
    const {id} = useParams();

    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPost = async () => {

        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:3000/posts/${id}`);
            setPost(response.data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {setLoading(false);}
    }

    useEffect(() => {
        void fetchPost();
    }, [id]);

    const { title, subtitle, content, created, author, readTime, comments, shares } = post;

    return (
        <section className="post-detail-section outer-content-container">
            {loading ? (<p>Laden..</p>) :
            <div className="inner-content-container__text-restriction">

                {error && <p>Helaas is het volgende fout gegaan tijdens het ophalen van de gegevens: {error}</p>}

                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <p className="post-detail-author">Geschreven door <em>{author}</em> op {formatDateString(created)}</p>
                <span className="post-detail-read-time">
                    <Clock color="#50535C" size={18}/>
                    <p> {readTime} minuten lezen</p>
                </span>
                <p>{content}</p>
                <p>{comments} reacties - {shares} keer gedeeld</p>

                <Link to="/posts" className="back-link">
                    <CaretLeft color="#38E991" size={22}/>
                    <p>Terug naar de overzichtspagina</p>
                </Link>
            </div>}
        </section>
    );
}

export default PostDetails;