import styles from "./albumform.module.css";
import React from 'react'
import { useRef } from "react";


// firestore database
import {db} from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore"; 

// toast for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlbumForm = () => {


  const nameRef = useRef();

  function clearForm(e){
    e.preventDefault();
    nameRef.current.value="";
    nameRef.current.focus();
}

async function handleSubmit(e){
  e.preventDefault();

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "album"),{
      Albumname:nameRef.current.value,
      imageList:[],
      }
  );

  // notification for new album
  toast.success("Album Added Successfully!.");
  
  // clear values inside form after submission and focusing on input box
  nameRef.current.value="";
  nameRef.current.focus();
}
  return (
    <>
      <ToastContainer />
      <div className="formContainer">
        <h1>Create an album</h1>
        
        <form  onSubmit={handleSubmit}>
          <input type="text"
            placeholder="Album Name"
            ref={nameRef} 
            required
            className={styles.input} />

          {/* delete data from input box  */}
          
          <button type="button" className={`${styles.formBtn} ${styles.clearBtn}`} onClick={clearForm}>Clear</button>
          {/* submit form and create a new album */}
          <button className={`${styles.formBtn} ${styles.createBtn}`} >Create</button>


        </form>
      </div>
    </>
  )
}

export default AlbumForm
