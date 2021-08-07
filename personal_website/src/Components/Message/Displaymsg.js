import React, { useEffect, useState } from 'react';
import './displaymsg.css'
import { Table,Card, PageHeader } from 'antd';
import {MailOutlined ,DeleteOutlined,EyeOutlined ,EyeInvisibleOutlined} from '@ant-design/icons';
import ChatIcon from '@material-ui/icons/Chat';
import db from '../../firebase';
function Displaymsg() {
    const [msgdata,setMsgdata] = useState([]);
    const [id,setId] = useState();
    const [msg,setMsg] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [status,setStatus] = useState('')
    useEffect(() => {
        db
        .collection("message")
        .orderBy('seen', 'desc')
        .onSnapshot(async Message => {
            let postData = await Message.docs.map(msg => {
                let data = msg.data();
                let {id} = msg;

                let payload = {
                    id,
                    ...data
                }
                return payload;
            });
            setMsgdata(postData);
            console.log(msgdata);
            
        })
      },[])
      const updateMsg = async(e) =>{
        e.preventDefault();
        (status === 'seen')? setStatus('unseen'):setStatus('seen');
        let payload = {
            Name:name,
            email:email,
            msg:msg,
            seen:status
        }
        db.collection("message").doc(id).update(payload)
        .then(function() {
            console.log("updated...");
        });
      }
      const deleteMsg =async(e) =>{
        e.preventDefault();
        const res = await db.collection('message').doc(id).delete();
        setName('');
        setMsg('');
        setEmail('');
        setId('');
      }
      
    return (
        <>
         <div className="edit_profile_header">
            <PageHeader
                style={{border:"1px solid rgb(235,237,240)"}}
                title="Message"  
            />
        </div>
        <div className="displaymsg_container">
            <div className="leftcontainer">
                <table>
                    <tbody>
                        <tr className={"tableheading"}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                        {
                            msgdata.map((row,idx) =>(
                                <tr key={idx} className={"tabledata"}>
                                    <td>{row.Name}</td>
                                    <td 
                                        onClick={()=>{
                                            let msgref =db.collection("message").doc(row.id)
                                            msgref
                                                 .get()
                                                 .then(doc => {
                                                     let{Name,msg,email,seen} = doc.data()
                                                     setName(Name);
                                                     setMsg(msg);
                                                     setEmail(email);
                                                     setStatus(seen);
                                                     setId(row.id);
                                                 })}
                                        } 
                                        style={{color:'blue',cursor:'pointer'}}
                                    >
                                            {row.email}
                                    </td>
                                    <td>{row.seen}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="rightcontainer">
                {(msg)
                ?<div className="site-card-border-less-wrapper">
                    <Card 
                        title={name} 
                        bordered={false} 
                        style={{ width: 400 }}
                        actions={[
                            <a href={email}><MailOutlined key="message"/></a>,
                            <DeleteOutlined key="delete" onClick={deleteMsg}/>,
                            (status === 'seen')
                            ?<EyeInvisibleOutlined key="unseen" onClick={updateMsg} />
                            :<EyeOutlined key="seen" onClick={updateMsg}/>
                        ]}
                    >
                        <p>{msg}</p>
                    </Card>
                </div>
                :<ChatIcon style={{
                    width:"300px",
                    height:"300px",
                    color:"rgb(216, 214, 214)"
                }}/>
                }
            </div>
        </div>
        </>
    );
}

export default Displaymsg;