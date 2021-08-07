import React from 'react';
import { useStateValue } from '../../StateProvider';
import '../blog.css';
import DisplayBlogImage from './DisplayBlogImage';
import DisplayBlogParagraph from './DisplayBlogParagraph';
import DisplayBlogTitle from './DisplayBlogTitle';
import DisplayBlogList from './DisplayBlogList';
import DisplayBlogParagraphTitle from './DisplayBlogParagraphTitle';

function Blogpreview() {
    const [{blogData,headerdata,read},] = useStateValue();
    
    return (
        <>
             <div className="blog_preview">
                {
                    headerdata.title && <DisplayBlogTitle  title={headerdata.title} time={headerdata.time} read={read} /> 
                }
                {
                    blogData.map((item,idx) =>(
                        (item.paragraph && <DisplayBlogParagraph key={idx} paragraph={item.paragraph} />) ||
                        (item.paragraphtitle && <DisplayBlogParagraphTitle key={idx} paragraphtitle={item.paragraphtitle}/>) ||
                        (item.image && <DisplayBlogImage  key={idx} image={item.image} />) ||
                        (item.list && <DisplayBlogList key={idx} list={item.list} />)
                    ))
                }
            </div>
        </>
    );
}

export default Blogpreview;