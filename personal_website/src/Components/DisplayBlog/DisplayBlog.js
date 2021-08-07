import React, { useEffect, useState } from 'react';
import '../blog.css';
import db from '../../firebase';
import {useParams} from 'react-router-dom';
import DisplayBlogTitle from './DisplayBlogTitle';
import DisplayBlogImage from './DisplayBlogImage';
import DisplayBlogList from './DisplayBlogList';
import DisplayBlogParagraph from './DisplayBlogParagraph';
import DisplaySubTitle from './DisplaySubTitle';
import Loading from '../Loading';

function DisplayBlog() {
    let {id} = useParams();
    const [blogtitle,setBlogtitle] = useState('');
    const [blogtime,setBlogtime] = useState('');
    const [blogread,setBlogread] = useState();
    const [blogcontent,setBlogcontent] = useState([]);
    
    useEffect(()=>{
       let postref =db.collection("Blogs").doc(id)
       postref
            .get()
            .then(doc => {
                let{title,time,read,blogData} = doc.data()
                setBlogtitle(title)
                setBlogtime(time)
                setBlogread(read)
                setBlogcontent(blogData)
            })
       
    },[])
     return (
        (blogtitle && blogtime && blogread && blogcontent) 
        ?    <div className="post__container">
                <DisplayBlogTitle  title={blogtitle} time={blogtime} read={blogread} />
                <div className="post__content">
                    {
                        blogcontent.map((item,idx) =>(
                            (item.paragraphtitle && <DisplaySubTitle key={idx} paragraphtitle={item.paragraphtitle}/>) ||
                            (item.paragraph && <DisplayBlogParagraph key={idx} paragraph={item.paragraph} />)||
                            (item.image && <DisplayBlogImage  key={idx} image={item.image} />) ||
                            (item.list && <DisplayBlogList key={idx} list={item.list} />)
                        ))
                    }
                </div>
            </div>
        :<Loading />
    )
}

export default DisplayBlog;