import React from 'react';

function DisplayBlogParagraph({paragraph}) {
    return (<div>
                {
                     paragraph.split('\n').map((para,idx) =>{
                        return <p className="blog_preview_para" key={idx}>{para}</p>; 
                     })
                }
           </div>);
}

export default DisplayBlogParagraph;