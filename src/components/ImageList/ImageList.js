import styles from "./imagelist.module.css";
import React from 'react'
import { useEffect, useState } from "react";
import ImageForm from "../ImageForm/ImageForm";
import Image from "../Image/Image"


// firestore database
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";


/* import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; */




const ImageList = (props) => {


  const { openAlbum, setOpenAlbum } = props;
  const [showImageForm, setShowImageForm] = useState(false);
  const [updateImage, setUpdateImage] = useState(null);

  // imagelist containing all the images within an album
  const [imageList, setImageList] = useState([]);
  // for searching image within an album
  // const [search,setSearch]=useState('');


  // for image lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // for searching image within an album
  const [search, setSearch] = useState('');
  // to redirect back to album list page
  function handleBackClick(e) {
    e.preventDefault();
    setOpenAlbum({ albumId: "", show: false });
  }
  // get all the images from database 
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "album", openAlbum.albumId), (doc) => {
      const data = doc.data().imageList;
      setImageList(data);
    });
  }, []);

  // deleting an image from list
  async function handleImageDelete(image) {
    const albumRef = doc(db, 'album', openAlbum.albumId);
    await updateDoc(albumRef, {
      imageList: arrayRemove(image)
    });
    //  toast.success("Image Successfully Deleted from your Album!");
  }

  // updating any image
  function handleImageEdit(image) {
    setUpdateImage(image);
    setShowImageForm(true);
  }

  // open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };
  // close lightbox
  const closeLightbox = () => {
    setIsOpen(false);
  };


  return (
    <>
      <div className={styles.btnContainer}>

        <button className={`${styles.btn} ${styles.backBtn}`} onClick={handleBackClick} >Back</button>
        {/* <input type="text"
          placeholder="Search Image..."
          onChange={(e) => setSearch(e.target.value)}
        /> */}
        <h1>{imageList.length !== 0 ? <input type="text"
          placeholder="Search Image..."
          onChange={(e) => setSearch(e.target.value)}
        /> : "No Images in Your Collection"}</h1>

        <button className={`${styles.btn} ${styles.addBtn}`}
          onClick={() => setShowImageForm(!showImageForm)}>
          {!showImageForm ? "Add Image" : "Cancel"}

        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        {showImageForm && <ImageForm albumId={openAlbum.albumId}
          updateImage={updateImage}
          setUpdateImage={setUpdateImage}
          setShowImageForm={setShowImageForm} />}
        {/* collection heading on condition */}
        {/* if album is empty it will show different heading */}
        <h1>{imageList.length !== 0 ? "Your Collection" : null}</h1>
      </div>


      <div className={styles.imageList}>
        {/* filter function to show search images if user enter something inside search bar */}
        {imageList.filter((image) => {
          return search.toLocaleLowerCase() === ''
            ? image
            : image.name.toLocaleLowerCase().includes(search);
          // map function to map over each image and show them inside a card
        }).map((image, i) => <Image image={image}
          key={i}
          index={i}
          handleImageEdit={handleImageEdit}
          handleImageDelete={handleImageDelete}
          openLightbox={openLightbox}
        />)}
      </div>



      {isOpen && (
        // main container
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            {/* close button to close the light box */}
            <button className="close-button" onClick={closeLightbox}>
              Close
            </button>
            {/* image of the lightbox */}
            <img
              className="lightbox-image"
              src={imageList[currentImageIndex].link}
              alt={`Image ${currentImageIndex}`}
            />
          </div>
        </div>
      )}

    </>





  )
}

export default ImageList;
