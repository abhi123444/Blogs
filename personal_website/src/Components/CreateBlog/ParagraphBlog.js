import React, { useState } from 'react';
import {Input,Button} from "antd";
import { useStateValue } from '../../StateProvider';
const { TextArea } = Input;

function ParagraphBlog(props) {
    const [, dispatch] = useStateValue();
    const [paragraph,setParagraph] = useState('');
    const [paragraphtitle,setParagraphtitle] = useState('');
    const [msg,setMsg] = useState('');
    const onParagraphchange = (event) =>setParagraph(event.target.value);
    const onMsgClickRemove = (event) =>setMsg('');
    const onParagraphTitlechange =(event) =>setParagraphtitle(event.target.value);
    const dispatchParagrap =() =>{
        dispatch({
            type: 'ADD_BLOGDATA',
            data:{
                paragraph:paragraph
            },
        })
        dispatch({
            type: 'ADD_READTIME',
            read:parseInt(paragraph.length)
        })
        setParagraph('');
        setMsg('Saved...');
    }
    const dispatchTitle =() =>{
        dispatch({
            type: 'ADD_BLOGDATA',
            data:{
                paragraphtitle:paragraphtitle
            },
        })
        dispatch({
            type: 'ADD_READTIME',
            read:parseInt(paragraphtitle.length)
        })
        setParagraphtitle('')
        setMsg('Saved...');
    }
    const addToBlogParagraph = () => {
        if(paragraphtitle.length >0 && paragraph.length >0){
            dispatchTitle();
            dispatchParagrap();
        }else if(paragraphtitle.length >0){
            dispatchTitle();
        }else if(paragraph.length >0){
            dispatchParagrap();
        }else{
            setMsg('plese write something...'); 
        }
    }
    return (
        <div>
             <div className="post_input_container">
                <div className="post_input_content">
                    <h4>Content <span className="valdationmsg">{msg}</span></h4>
                </div>
                <div className="post_title_input">
                    <Input placeholder=" Sub Title" onChange={onParagraphTitlechange} onClickCapture={onMsgClickRemove}/>
                </div>
                <div className="post_content_input">
                    <TextArea rows={5} placeholder="Write Paragraph here..." value={paragraph} onClickCapture={onMsgClickRemove} onChange={onParagraphchange} />
                </div>
            </div>
            <div className="post_inputs_container">
                <Button type="primary" block onClick={addToBlogParagraph} >
                    Add Paragraph
                </Button>   
            </div>
        </div>
    );
}

export default ParagraphBlog;