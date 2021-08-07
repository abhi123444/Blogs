import React from 'react';

function DisplayBlogImage({image}) {
    return (
        <div className="post__content_img">
            <img src={image} alt="" />
        </div>
    );
}

export default DisplayBlogImage;