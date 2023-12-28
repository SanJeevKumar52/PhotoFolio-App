import styles from "./albumlist.module.css"
import { useState, useEffect } from 'react';
import React from 'react'
import AlbumForm from "../AlbumForm/AlbumForm";
import Album from "../Album/Album";
import ImageList from "../ImageList/ImageList";


import { db } from "../../firebaseInit"
import { collection, onSnapshot } from "firebase/firestore";


function AlbumList() {

    const [albumList, setAlbumList] = useState([]);
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });

    useEffect(() => {

        // getting realtime updates from database
        onSnapshot(collection(db, "album"), (snapShot) => {
            const card = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            console.log(card);
            // storing all the albums within local state variable
            setAlbumList(card);
        });
    }, []);

    return (
        <>
            <div className={styles.mainContainer}>
                {!openAlbum.open ? (
                    <>
                        <div className={styles.albumForm}>
                            {showAlbumForm && <AlbumForm />}
                        </div>


                        <div className={styles.header}>
                            <h1>Your albums</h1>

                            <button className={styles.btn}
                                onClick={() => setShowAlbumForm(!showAlbumForm)} >{!showAlbumForm ? "Add album" : "cancel"}</button>
                        </div>

                        <div className={styles.albumContainer}>
                            {albumList.map((card, i) => <Album key={i}
                                info={card}
                                setOpenAlbum={setOpenAlbum} />)}
                        </div>

                    </>) : <ImageList openAlbum={openAlbum}
                        setOpenAlbum={setOpenAlbum} />}

            </div>
        </>

    )
}

export default AlbumList
