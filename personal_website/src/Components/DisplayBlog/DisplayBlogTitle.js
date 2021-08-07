import React from 'react';

function DisplayBlogTitle({title,read,time}) {
    return (
        <div className="post_header">
            <p className="post__title">{title}</p>
            <p className="post__date">{time}, <span>{read}. min read</span></p>
        </div>
    );
}

export default DisplayBlogTitle;