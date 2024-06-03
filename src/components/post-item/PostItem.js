import { useState } from 'react';
import './PostItem.css';
import axios from 'axios'
import { click } from '@testing-library/user-event/dist/click';
import { CommentItem } from '../comment-item/CommentItem';

export function PostItem({postItem, users}) {

    const [showComments, setShowComments] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const getUserName = () => {
        let user = users.filter(item => item.id == postItem.userId);
        return user[0].name;
    }

    const loadComments = async() => {
        try {
            setIsLoading(true);
            const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postItem.id}`);
            setComments(res.data);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    const doShowComments = (e) => {
        if (e.target.tagName == 'DIV' && !showComments) {
            setShowComments(true);
            loadComments();
        }
    }

    return (
        <div className="post-item-card" onClick={doShowComments}>
            <div className="title">
                {postItem.title}
            </div>
            <div className="description">
                {postItem.body}
            </div>
            <div className='user-info'>
                <img src="/avatar.png" />
                {getUserName()}
            </div>

            {
                showComments && (
                    <div className='comment-box'>
                        <label className='box-title'>Comments</label>
                        {isLoading && <img src="/loading.gif" className="loading-gif" />}
                        {!isLoading && comments.length && (
                            comments.map((item, index) => (
                                <CommentItem key={index} comment={item} />
                            ))
                        )}

                        <div style={{textAlign: 'center'}}>
                            <button onClick={() => {setShowComments(false)}}>Close</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}