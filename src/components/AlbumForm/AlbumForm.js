// Import styles from the specified CSS module
import styles from "./albumform.module.css";

// Import React and useRef from the React library
import React, { useRef } from 'react';

// Import Firebase related modules for database operations
import { db } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";

// Import ToastContainer and toast for notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the AlbumForm component
const AlbumForm = () => {

  // Ref to store the album name input value
  const nameRef = useRef();

  // Function to clear the form's data
  function clearForm(e) {
    e.preventDefault();
    nameRef.current.value = "";
    nameRef.current.focus();
  }

  // Function to handle the form submission and create a new album
  async function handleSubmit(e) {
    e.preventDefault();

    // Add a new document with a generated id to the "album" collection
    const docRef = await addDoc(collection(db, "album"), {
      Albumname: nameRef.current.value,
      imageList: [],
    });

    // Notification for successful album creation
    toast.success("Album Added Successfully!");

    // Clear values inside the form after submission and focus on the input box
    nameRef.current.value = "";
    nameRef.current.focus();
  }

  // Render the AlbumForm component
  return (
    <>
      <ToastContainer />
      <div className="formContainer">
        <h1>Create an album</h1>

        {/* Form for entering album name */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Album Name"
            ref={nameRef}
            required
            className={styles.input}
          />

          {/* Button to clear data from the input box */}
          <button
            type="button"
            className={`${styles.formBtn} ${styles.clearBtn}`}
            onClick={clearForm}
          >
            Clear
          </button>

          {/* Button to submit the form and create a new album */}
          <button className={`${styles.formBtn} ${styles.createBtn}`}>Create</button>
        </form>
      </div>
    </>
  );
}

// Export the AlbumForm component
export default AlbumForm;
