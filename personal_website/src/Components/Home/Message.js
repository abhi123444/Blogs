import React, { useState } from 'react';
import {Input} from "antd";
import db from '../../firebase';
import validator from 'validator'
const { TextArea } = Input;

function Message() {
    const [email,setEmail] = useState('');
    const [namem,setNamem] = useState('');
    const [msg,setMsg] = useState('');
    const [confirm,setConfirm] = useState('');
    const setEmailvalue = (e) => setEmail(e.target.value);
    const setMsgvalue = (e) => setMsg(e.target.value);
    const setNamevalue = (e) => setNamem(e.target.value);

    const onCreateMsg =()=>{
        if(validator.isEmail(email)){
        if(msg && email && namem){
        db.collection("message").add({
            Name:namem,
            email,
            msg,
            seen:'unseen'
        })
        .then((docRef) => {
            setNamem('')
            setEmail('');
            setMsg('');
            console.log("done..:");
            setConfirm("Submitted successfuly..!")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        }else{
            setConfirm("Please write msg correctly..")
        }
    }else{
        setConfirm("please check email");
    }
    }

    return (
        <div className="message">
            <div>
                <div>Name</div>
                <div><Input value={namem} onChange={setNamevalue} placeholder="Name" /></div>
            </div>
            <div>
                <div>Email</div>
                <div><Input value={email} onChange={setEmailvalue} placeholder="Email" /></div>
            </div>
            <div>
                <div>Message</div>
                <div><TextArea rows={4} value={msg} onChange={setMsgvalue} placeholder="Write here..."/></div>
            </div>
            <div>
                <button className="msgSubmit" onClick={onCreateMsg}>Submit</button>
            </div>
            <h3>{confirm}</h3>
        </div>
    );
}

export default Message;