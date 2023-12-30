import styles from "./imageform.module.css";

import React from 'react'

import {  useRef } from "react"

import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// toast for notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageForm = (props) => {

    const { albumId, updateImage, setUpdateImage, setShowImageForm } = props;
    // to store image name and image url
    const imageNameRef = useRef();
    const imageUrlRef = useRef();

    

    // claer image form's data 
    function clearForm() {
        imageNameRef.current.value = null;
        imageUrlRef.current.value = null;
        imageNameRef.current.focus();
    }

    // to update any image within the imagelist
    async function handleUpdateSubmit(e) {
        e.preventDefault();

        // old data of image inside the database
        const oldData = {
            name: updateImage.name,
            link: updateImage.link
        };

        // new updated data entered by the user
        const newData = {
            name: imageNameRef.current.value,
            link: imageUrlRef.current.value
        };

        // adding new Image
        const albumRef = doc(db, 'album', albumId);
        updateDoc(albumRef, {
            imageList: arrayUnion(newData)
        });

        // removing old image 
        updateDoc(albumRef, {
            imageList: arrayRemove(oldData),

        });

        toast.success(" Image Updated !")

        // setting update to false
        setUpdateImage(null);

        // hide the ImageForm
        setShowImageForm(false);

        // clear data within the ImageForm
        clearForm();
    }

    // add a new Image in Image list
    async function handleSubmit(e) {
        e.preventDefault();

        // data of the Image
        const data = {
            name: imageNameRef.current.value,
            link: imageUrlRef.current.value
        };

        // adding new image inside the array of image in database
        const albumRef = doc(db, 'album', albumId);
        await updateDoc(albumRef, {
            imageList: arrayUnion(data)
        });

        // success notification
        toast.success("New Image Added to your Album!")

        // clear form's data
        clearForm();
    }

    return (

        <>
            <ToastContainer />
            <div className={styles.formContainer}>
                <h1>{!updateImage ? "Add an Image" : "Update Image"}</h1>
                {/* for name of the image */}

                <form className={styles.updateIMgForm} onSubmit={updateImage ? handleUpdateSubmit : handleSubmit}>
                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Name"
                        ref={imageNameRef}
                        required />

                    {/* for image url */}
                    <input type="text"
                        className={styles.inputBox}
                        placeholder="Enter Url"
                        ref={imageUrlRef}
                        required />
                    <br />

                    {/* clear data inside the input box */}
                    <div className={styles.buttonContainer} >
                    <button className={`${styles.btn} ${styles.clear}`}
                        onClick={clearForm}>Clear
                    </button>
                    <button className={`${styles.btn} ${styles.add}`}>
                        {/* show add or update on the button   */}
                        {!updateImage ? "Add" : "Update"}
                    </button>
                    </div>
                </form>
            </div>


        </>
    )
}

export default ImageForm;
