import React from 'react'
import styles from "./album.module.css";

const Album = (props) => {

    // info about the album and to open an album
    var { info, setOpenAlbum } = props;
     // onClick over Album open the Album's content
     function handleClick(){
        setOpenAlbum({albumId:info.id,open:true});
     }

    return (

        <>
            <div className={styles.card}>
                <div className={styles.cardContainer} onClick={handleClick}>

                    <div className={styles.cardImage} > <img  className={styles.cardImage}  alt='albumImg' src='\cardimage.png'/> </div>
                   {/*  <img className={styles.cardImage} alt='albumImg' src='./cardimage.png'/> */}
                    <div className={styles.cardName}>{info.Albumname}</div>

                </div>
                
            </div>
            
        </>
    )
}

export default Album
