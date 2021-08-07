import React, { useEffect, useState } from 'react';
import './Displayblogs.css';
import db from '../../firebase';
import _ from "lodash";
import BlogSnap from './BlogSnap';
import Loading from '../Loading';
import { PageHeader } from 'antd';
function DisplayBlogs(props) {
    const [postsData, setPostData] = useState([]);
   
    useEffect(() => {
        db
        .collection("Blogs")
        .orderBy('time', 'desc')
        .onSnapshot(async posts => {
            let postData = await posts.docs.map(post => {
                let data = post.data();
                let {id} = post;

                let payload = {
                    id,
                    ...data
                }
                return payload;
            });
            setPostData(postData);
            console.log(postData)
        })
      },[])

    return (
        (postsData)
        ?
            <div className="posts">
                <div className="post_snap_title">
                    <PageHeader
                        style={{border:"1px solid rgb(235,237,240)"}}
                        title="Blogs"  
                    />
                </div>
                {
                        _.map(postsData ,(post,idx) =>(
                            <BlogSnap 
                                key={idx} 
                                id={post.id}
                                title={post.title} 
                                time={post.time}
                                read={post.read}
                            />
                        )) 
                }   
            </div>
        :<Loading />
    );
}

export default DisplayBlogs;