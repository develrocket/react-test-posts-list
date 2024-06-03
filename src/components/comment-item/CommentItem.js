import './CommentItem.css';

export function CommentItem({comment}) {
    return (
        <div className='comment-item-card'>
            <img src="/avatar.png" />
            <div>
                <p>{comment.name}</p>
                <p>{comment.email}</p>
                <p style={{color: '#b5b4b4'}}>{comment.body}</p>
            </div>
        </div>
    )
}