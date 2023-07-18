import React from 'react'
import {storage, db } from './../utils/firebaseConfig'
import { useState } from 'react';

export default function Test({uplift}) {

  const [image, setImage] = useState(null);
  const [viewFile, setViewFile] = useState(null);



  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
        setImage(e.target.files[0]);
        setViewFile(URL.createObjectURL(e.target.files[0]))
        console.log(image)
    }

}

  const handleUpload = (evt) => {
    evt.preventDefault();
    const uploadTask = storage.ref(`images/`).put(image);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        },
        (error) => {
            console.log(error);
            alert(error.message);
        },
        () => {
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url => {
                    alert('hello')
                    console.log(url);
        }))
      }
    );
      
}

  return (
    <div>
      <form id="photo">
        <input type="file" onChange={handleChange}></input>
        <button className='px-2 py-2' form='photo' onClick={handleUpload}>Submit</button>
      </form>
    </div>
  )
}

