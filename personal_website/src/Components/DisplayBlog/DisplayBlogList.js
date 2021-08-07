import React from 'react';

function DisplayBlogList({list}) {
    return (
        <div className="post__content_lists">
            <ul>
            {
                list.map((item,idx) =>(
                    <li>{item.line}</li>
                ))
            }
            </ul>
        </div>
    );
}

export default DisplayBlogList;