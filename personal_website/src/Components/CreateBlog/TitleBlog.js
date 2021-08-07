import React, { useState } from 'react';
import {Button, Input} from "antd";
import { useStateValue } from '../../StateProvider';
import moment from 'moment';

function TitleBlog() {
    const [, dispatch] = useStateValue();
    const [title,setTitle] = useState('');
    const [msg,setMsg] = useState('');
    const onTitlechange = (event) =>setTitle(event.target.value);
    const onMsgClickRemove = (event) =>setMsg('');

    const addToBlogTitle_ = () => {
        if(title.length >0){
            dispatch({
                type: 'ADD_BLOGDATA_TITLE',
                data:{
                    title:title,
                    time:moment(new Date()).format("MMMM Do YY")
                },
            })

            setTitle('');
            setMsg('Saved...');
        }else{
            setMsg('please type title...'); 
        }
    }
    return (
        <div className="post_input_container">
            <div className="post_input_title">
                <h4>Title <span className="valdationmsg">{msg}</span></h4>
            </div>
            <div className="post_title_input">
                <Input placeholder="Title" onChange={onTitlechange} onClickCapture={onMsgClickRemove}/>
            </div>
            <div className="post_inputs_container">
                <Button type="primary" block onClick={addToBlogTitle_} >
                    Add Title
                </Button>   
            </div>
        </div>
    );
}

export default TitleBlog;