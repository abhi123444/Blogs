import React from 'react';

function DisplayBlogImage({image}) {
    return (
        <div className="blog_preview_img">
            <img src={image} alt=""/>
        </div>
    );
}

export default DisplayBlogImage;