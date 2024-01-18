// Importing styles from the specified CSS module for the Navbar component
import styles from "./navbar.module.css";

// Defining the NavBar functional component
export default function NavBar() {
    return (
        <>
            {/* Container div for the Navbar with styles applied from the imported CSS module */}
            <div className={styles.navbar}>
                {/* Logo image with styles applied */}
                <img className={styles.logo} src={require("../Image/PhotoFolioLogo.png")} alt="NavbarLogo" />

                {/* Text span for the brand name "PhotoFolio" */}
                <span>PhotoFolio</span>
            </div>
        </>
    );
}
