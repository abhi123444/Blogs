import { Button, PageHeader } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Blogpreview from './Blogpreview';
import './createBlog.css';
import ImageBlog from './ImageBlog';
import ListBlog from './ListBlog';
import ParagraphBlog from './ParagraphBlog';
import TitleBlog from './TitleBlog';

function CreateBlog(props) {
    const history = useHistory();
    const [{blogData,headerdata,read,user},dispatch] = useStateValue();
    const [msg,setMsg] = useState('');
        const addToBlogTitle = () => {
            if(blogData.length >0){
                db.collection("Blogs").add({
                    blogData,
                    title:headerdata.title,
                    time:headerdata.time,
                    read:Math.ceil(read / 255)   
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    dispatch({
                        type: 'DELETE_BLOGDATA'
                    })
                    history.replace('/blogs')
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    setMsg("Somthing wrong..")
                });
            }
        }
        const homerender =() =>{
            history.replace('/')
        }
        const Deleteblog = () => {
            if(blogData.length >0){
                dispatch({
                    type: 'DELETE_BLOGDATA'
                })
            }
        }
    
    return (
        (user)?
        <>
            <div className="blog_header">
                <PageHeader
                    style={{border:"1px solid rgb(235,237,240)",}}
                    title="Create Blog"  
                />
            </div>
            <div className="blog_container">
                <div className="post_inputs_container_">
                    <TitleBlog />
                    <ParagraphBlog />
                    <div className="blog_container_row">
                        <div className="blog_container_row_one"><ImageBlog /></div>
                        <div className="blog_container_row_two"><ListBlog /></div>
                    </div>
                    <hr/>
                    <span className="valdationmsg">{msg}</span>
                    <div className="post_inputs_container_submit">
                        <Button type="primary" block onClick={addToBlogTitle} >
                            Publish Blog
                        </Button>
                        <Button type="primary"style={{marginRight:"10px"}} block onClick={Deleteblog}>
                            Delete Blog
                        </Button>      
                    </div>
                </div>
                <div className="blog_preview">
                    <Blogpreview />
                </div>
            </div>
        </>
        :<h3 onClick={homerender} style={{cursor:"pointer"}}>Click here to go Home page</h3>
    );
}

export default CreateBlog;