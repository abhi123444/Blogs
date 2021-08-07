import React, { useState } from 'react';
import {Input,Button} from "antd";
import { useStateValue } from '../../StateProvider';
import DisplayBlogList from './DisplayBlogList';

function ListBlog() {

    const [{list}, dispatch] = useStateValue();
    const [line,setLine] = useState('');
    const [msg,setMsg] = useState('');
    const [listlength,setListlength] = useState(0);
    const onLinechange = (event) =>setLine(event.target.value);
    const onMsgClickRemove = (event) =>setMsg('');

    const addToBlogLine = () =>{
        if(line.length >0){
            dispatch({
                type: 'ADD_BLOGDATA_LIST',
                data:{
                    line:line
                },
            })
            setListlength(listlength + line.length)
            setMsg('Line added in your list...')
            setLine('');
        }else{
            setMsg('write something..')
        }
    }
    const addToBlogList = () => {
        if(list.length >0){
            dispatch({
                type: 'ADD_BLOGDATA',
                data:{
                    list:list
                },
            })
            dispatch({
                type: 'REMOVE_BLOGDATA_LIST'
            })
            dispatch({
                type: 'ADD_READTIME',
                read:listlength
            })
            setMsg('List saved successfully...');
        }else{
            setMsg('list is empty..')
        }
    }
    return (
        <div>
           <div className="post_input_container">
                <div className="post_input_title">
                    <h4>Create List <span className="valdationmsg">{msg }</span></h4>
                </div>
                <div className="post_title_input">
                    <Input placeholder="add line" value={line} onChange={onLinechange} onClickCapture={onMsgClickRemove}/>
                </div>
            </div>
            <DisplayBlogList list={list} />
            <div className="post_inputs_container">
                <Button type="primary" block onClick={addToBlogList} >
                    Save List 
                </Button> 
                <Button type="primary"style={{marginLeft:"10px"}} block onClick={addToBlogLine} >
                    Add List item
                </Button>     
            </div> 

        </div>
    );
}

export default ListBlog;