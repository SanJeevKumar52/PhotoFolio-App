import styles from "./albumform.module.css";
import React from 'react'
import { useRef } from "react";


const AlbumForm = () => {


  const nameRef = useRef();

  function clearForm(e){
    e.preventDefault();
    nameRef.current.value="";
    nameRef.current.focus();
}

  async function handleSubmit(e){
    e.preventDefault();

    console.log(nameRef.current.value)

  }
  return (
    <>
      <div className="formContainer">
        <h1>Create an album</h1>
        
        <form  onSubmit={handleSubmit}>
          <input type="text"
            placeholder="Album Name"
            ref={nameRef} 
            required
            className={styles.input} />

          {/* delete data from input box  */}
          
          <button className={`${styles.formBtn} ${styles.clearBtn}`} onClick={clearForm}>Clear</button>
          {/* submit form and create a new album */}
          <button className={`${styles.formBtn} ${styles.createBtn}`} >Create</button>


        </form>
      </div>
    </>
  )
}

export default AlbumForm
