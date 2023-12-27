import React from 'react'
import styles from "./album.module.css";
const Album = () => {
    return (

        <>
            <div className='Card'>
                <div className={styles.cardContainer}>

                    <div className={styles.cardImage}> </div>
                    <div className={styles.cardName}>Albumname</div>

                </div>
                <div className={styles.cardContainer}>

                    <div className={styles.cardImage}> </div>
                    <div className={styles.cardName}>Albumname</div>

                </div>
            </div>
        </>
    )
}

export default Album
