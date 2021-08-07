import React, { useState } from 'react';
import { storage } from "../../firebase"
import { useStateValue } from '../../StateProvider';
import { Progress } from 'antd';
function ImageBlog() {

    const [, dispatch] = useStateValue();
    const [displayimg, setDisplayimg] = useState('data:image/jpeg;base64,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')
    const [imageAsFile, setImageAsFile] = useState('')
    const [progress, setProgress] = useState(0);
    const [msg, setMsg] = useState('');

    const uploadImage = () => {
        const Imginput = document.querySelector("#imageinput");
        Imginput.click();
    }
    const handleImageAsFile = (e) => {
        setProgress(0);
        setMsg('');
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
        setDisplayimg(URL.createObjectURL(e.target.files[0]))
    }
    const handleUpload = e => {
        e.preventDefault()
        if (imageAsFile) {
            const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
            uploadTask.on(
                'state_changed',
                (snapShot) => {
                    const progress = Math.round(
                        (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                    );
                    setProgress(progress)
                }, (err) => {
                    console.log(err)
                }, () => {
                    storage
                        .ref('images')
                        .child(imageAsFile.name)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            dispatch({
                                type: 'ADD_BLOGDATA',
                                data: {
                                    image: fireBaseUrl
                                },
                            })
                        })
                    setImageAsFile(null);
                })
        } else {
            setMsg('select image..')
        }
    }

    return (
        <div className="post_input_container">
            <div className="post_input_image">
                <h4>Blogs Images</h4>
            </div>
            <div className="post_title_image">
                <input
                    type="file"
                    id="imageinput"
                    onChange={handleImageAsFile}
                    hidden
                />
                <img
                    src={displayimg}
                    onClick={uploadImage}
                    alt=""
                    style={{
                        cursor: "pointer",
                        position: "absolute",
                        opacity: "0.5"
                    }}
                />
                <Progress
                    type="circle"
                    percent={progress}
                    width={80}
                    onClick={uploadImage}
                    style={{
                        marginTop: "10px",
                        marginLeft: "10px",
                        cursor: "pointer",
                        fontWeight: "700"
                    }}
                />
                <div className="post_inputs_img_button">
                    <button className="btn" onClick={handleUpload}> Upload</button>
                    <span className="valdationmsg">{msg}</span>
                </div>
            </div>
        </div>
    );
}

export default ImageBlog;