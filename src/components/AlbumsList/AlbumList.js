import styles from "./albumlist.module.css"
import { useState } from 'react';
import React from 'react'
import AlbumForm from "../AlbumForm/AlbumForm";
import Album from "../Album/Album";
import ImageList from "../ImageList/ImageList";

function AlbumList() {

    const [albumList,setAlbumList] = useState([]);
    const [showAlbumForm, setShowAlbumForm] = useState(false);
    const [openAlbum,setOpenAlbum]=useState({albumId:"",open:false});

    return (
        <>
            <div className={styles.mainContainer}>
                {!openAlbum.open?(
             <>
                <div className={styles.albumForm}>
                    {showAlbumForm && <AlbumForm/>}
                </div>
                

                <div className={styles.header}>
                    <h1>Your albums</h1>

                    <button className={styles.btn}
                        onClick={() => setShowAlbumForm(!showAlbumForm)} >{!showAlbumForm ? "Add album" : "cancel"}</button>
                </div>

                <div className={styles.albumContainer}>
                    <Album />
                </div>

                </>):<ImageList openAlbum={openAlbum} 
                            setOpenAlbum={setOpenAlbum} />}

            </div>
        </>

    )
}

export default AlbumList
