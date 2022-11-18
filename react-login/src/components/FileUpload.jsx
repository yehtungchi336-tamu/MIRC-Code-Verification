import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { storage } from '../config/firebase';
import Details from './Details';



const FileUpload = (list, setter) => {


    const [progrss, setProgrss] = useState(0);
    const [isLoading, setIsLoading] = useState();
    const [file, setFile] = useState();
    const [url, setUrl] = useState();


    const onFileUpload = () => {
        if (!file) return;
        setIsLoading(true);
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgrss(progress);
        }, (err) => {
            console.log(err);
            setIsLoading(false);
        },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setUrl(url);
                        setIsLoading(false);
                    })
            }
        )
    }

    const onFileChange = e => {
        setFile(e.target.files[0]);
        e.preventDefault();
    }


    return (
        <>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
            </button>
            <div className="break"></div>
            {isLoading && <p>File upload <b>{progrss}%</b></p>}
            {url && <p>Firebase storage URL: <a href={url} target="_blank" rel="noreferrer">{url}</a></p>}
        </>

    )
}

export default FileUpload
Footer