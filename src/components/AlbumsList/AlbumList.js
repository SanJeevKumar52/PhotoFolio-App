// Import styles from the specified CSS module
import styles from "./albumlist.module.css";

// Import necessary React hooks and components
import { useState, useEffect } from 'react';
import React from 'react';
import AlbumForm from "../AlbumForm/AlbumForm";
import Album from "../Album/Album";
import ImageList from "../ImageList/ImageList";

// Import Firebase related modules for database operations
import { db } from "../../firebaseInit";
import { collection, onSnapshot } from "firebase/firestore";

// Define the AlbumList component
function AlbumList() {

    // State variables to manage album list, album form visibility, and open album details
    const [albumList, setAlbumList] = useState([]);
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });

    // useEffect hook to fetch real-time updates from the database when the component mounts
    useEffect(() => {
        // Getting real-time updates from the "album" collection in the database
        onSnapshot(collection(db, "album"), (snapShot) => {
            // Transforming the snapshot data into a format suitable for local state
            const card = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            console.log(card);
            // Storing all the albums within the local state variable
            setAlbumList(card);
        });
    }, []);

    // Render the AlbumList component
    return (
        <>
            <div className={styles.mainContainer}>
                {!openAlbum.open ? (
                    <>
                        {/* Displaying the AlbumForm component if showAlbumForm is true */}
                        <div className={styles.albumForm}>
                            {showAlbumForm && <AlbumForm />}
                        </div>

                        {/* Header section with the option to add a new album */}
                        <div className={styles.header}>
                            <h1>Your albums</h1>
                            <button
                                className={styles.btn}
                                onClick={() => setShowAlbumForm(!showAlbumForm)}>
                                {!showAlbumForm ? "Add album" : "Cancel"}
                            </button>
                        </div>

                        {/* Displaying the list of albums */}
                        <div className={styles.albumContainer}>
                            {albumList.map((card, i) => <Album key={i} info={card} setOpenAlbum={setOpenAlbum} />)}
                        </div>
                    </>
                ) : (
                    // Displaying the ImageList component when an album is open
                    <ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
                )}
            </div>
        </>
    );
}

// Export the AlbumList component
export default AlbumList;
