// Importing styles for the Image component from a CSS module
import styles from "./image.module.css";

// Functional component to display an individual image within an album
export default function Image(props) {
    // Destructuring props to get necessary values
    const { image, index, handleImageEdit, handleImageDelete, openLightbox } = props;

    return (
        <>
            {/* Main container for the Image component */}
            <div className={styles.imageCard}>

                {/* Container for displaying the image */}
                <div className={styles.imageBox}>
                    {/* Image element with an onClick handler to open the lightbox */}
                    <img
                        src={image.link}
                        alt="CardImage"
                        onClick={() => openLightbox(index)}
                    />
                </div>

                {/* Container for displaying image information and buttons for edit and delete */}
                <div className={styles.imageInfo}>
                    {/* Displaying the name of the image */}
                    <span>{image.name}</span>

                    {/* Button for editing the image */}
                    <button
                        className={`${styles.imageBtn} ${styles.editBtn}`}
                        onClick={() => handleImageEdit(image)}
                    >
                        Edit
                    </button>

                    {/* Button for deleting the image */}
                    <button
                        className={`${styles.imageBtn} ${styles.deleteBtn}`}
                        onClick={() => handleImageDelete(image)}
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    )
}
