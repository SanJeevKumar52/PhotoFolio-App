import styles from "./albumform.module.css";
import React from 'react'

const AlbumForm = () => {

  async function handleSubmit(e){
    e.preventDefault();

  }
  return (
    <>
      <div className="formContainer">
        <h1>Create an album</h1>
        <form  onSubmit={handleSubmit}>
          <input type="text"
            placeholder="Album Name"
            required
            className={styles.input} />

          {/* delete data from input box  */}
          
          <button className={`${styles.formBtn} ${styles.clearBtn}`}>Clear</button>
          {/* submit form and create a new album */}
          <button className={`${styles.formBtn} ${styles.createBtn}`} >Create</button>


        </form>
      </div>
    </>
  )
}

export default AlbumForm
