import React from 'react';
import './blogSnap.css';
import {Link} from 'react-router-dom'

function BlogSnap({id,title,time,read}) {
    return (
        <div className="post_snap">
            <div>
                <div className="post_snap_header">
                    <Link to={`/blog/${id}`} ><h3 className="post_title">{title}</h3></Link>
                    <p className="post_date">{time}, <span>{read}.min read</span></p>
                </div>
            </div>
        </div> 
    );
}

export default BlogSnap;