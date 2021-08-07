import React from 'react';

function DisplayBlogTitle({title,time,read}) {
    return (
        <div className="post_header">
            <p className="post__title">{title}</p>
            <p className="post__date">{time}, <span>{Math.ceil(read / 255)}. min read</span></p>
        </div>
    );
}

export default DisplayBlogTitle;