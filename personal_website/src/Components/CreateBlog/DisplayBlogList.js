import React from 'react';

function DisplayBlogList({list}) {
    return (
        <div className="blog_preview_lists">
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