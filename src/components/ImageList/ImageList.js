// Importing the styles for the component from a CSS module
import styles from "./imagelist.module.css";
import Slider from "react-carousel-responsive";
import "react-carousel-responsive/dist/styles.css";
// Importing necessary React features
import React from 'react'
import { useEffect, useState } from "react";

// Importing additional components
import ImageForm from "../ImageForm/ImageForm";
import Image from "../Image/Image"

// Importing Firestore database functionalities
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";

// Importing toast notification components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Functional component for displaying a list of images
const ImageList = (props) => {
  // Destructuring props to get necessary values
  const { openAlbum, setOpenAlbum } = props;

  // State variables for managing component state
  const [showImageForm, setShowImageForm] = useState(false);
  const [updateImage, setUpdateImage] = useState(null);
  const [imageList, setImageList] = useState([]);  // State for storing the list of images
  const [search, setSearch] = useState('');  // State for searching images within an album
  const [isOpen, setIsOpen] = useState(false);  // State for managing image lightbox
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle navigating back to the album list page
  function handleBackClick(e) {
    e.preventDefault();
    setOpenAlbum({ albumId: "", show: false });
  }

  // useEffect hook to fetch and update the list of images when the album changes
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "album", openAlbum.albumId), (doc) => {
      const data = doc.data().imageList;
      setImageList(data);
    });
    // Cleanup function for unsubscribing from the snapshot listener
    return () => unsub();
  }, [openAlbum]);

  // Function to handle deleting an image from the list
  async function handleImageDelete(image) {
    const albumRef = doc(db, 'album', openAlbum.albumId);
    await updateDoc(albumRef, {
      imageList: arrayRemove(image)
    });
    // Displaying a success toast notification
    toast.success("Image Successfully Deleted from your Album!");
  }

  // Function to handle editing an image
  function handleImageEdit(image) {
    setUpdateImage(image);
    setShowImageForm(true);
  }

  // Function to open the lightbox and set the current image index
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Toast container for displaying notifications */}
      <ToastContainer />

      {/* Container for buttons and search bar */}
      <div className={styles.btnContainer}>
        {/* Button to navigate back to the album list page */}
        <button className={`${styles.btn} ${styles.backBtn}`} onClick={handleBackClick}>Back</button>
        
        {/* Conditional rendering of search bar or no images message */}
        <h1>{imageList.length !== 0 ? 
          <input
            type="text"
            placeholder="Search Image..."
            onChange={(e) => setSearch(e.target.value)}
          /> : "No images found in the album"}
        </h1>

        {/* Button to add or cancel adding an image */}
        <button className={`${styles.btn} ${styles.addBtn}`} onClick={() => setShowImageForm(!showImageForm)}>
          {!showImageForm ? "Add Image" : "Cancel"}
        </button>
      </div>

      {/* Container for displaying the image form and collection heading */}
      <div style={{ textAlign: "center" }}>
        {showImageForm && <ImageForm
          albumId={openAlbum.albumId}
          updateImage={updateImage}
          setUpdateImage={setUpdateImage}
          setShowImageForm={setShowImageForm}
        />}
        {/* Conditional rendering of collection heading */}
        <h1>{imageList.length !== 0 ? "Your Collection" : null}</h1>
      </div>

      {/* Container for displaying the list of images */}
      <div className={styles.imageList}>
        {/* Filtering and mapping over the imageList to display images */}
        {imageList.filter((image) => {
          return search.toLocaleLowerCase() === ''
            ? image
            : image.name.toLocaleLowerCase().includes(search);
        }).map((image, i) => <Image
          image={image}
          key={i}
          index={i}
          handleImageEdit={handleImageEdit}
          handleImageDelete={handleImageDelete}
          openLightbox={openLightbox}
        />)}
      </div>

      {/* Lightbox container */}
      {isOpen && (
        <div className={styles.lightboxoverlay} >
          <button className={styles.PopUpbutton} onClick={closeLightbox}>Close</button>
          <div className={styles.lightboxcontainer}>

  
            {/* Image displayed in the lightbox */}
            <Slider  showArrows={true}  >
                {imageList.map( (img) =>{
                  return <div>
                  <img src={img.link} alt="PopUpImage" />
              </div>
                })}
                
            </Slider>
            
          </div>
        </div>
      )}
    </>
  )
}

// Exporting the ImageList component
export default ImageList;
