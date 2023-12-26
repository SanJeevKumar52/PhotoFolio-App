import styles from "./albumlist.module.css"
import { useState } from 'react';
import React from 'react'
import AlbumForm from "../AlbumForm/AlbumForm";

function AlbumList() {


    const [showAlbumForm, setShowAlbumForm] = useState(false);


    return (
        <>
            <div className={styles.mainContainer}>

                <div className={styles.albumForm}>
                    {showAlbumForm && <AlbumForm/>}
                </div>
                

                <div className={styles.header}>
                    <h1>Your albums</h1>

                    <button className={styles.btn}
                        onClick={() => setShowAlbumForm(!showAlbumForm)} >{!showAlbumForm ? "Add album" : "cancel"}</button>
                </div>


            </div>
        </>

    )
}

export default AlbumList
