import styles from "./navbar.module.css"

export default function NavBar(){
    return(
        <>
        <div className={styles.navbar}>
            <img className={styles.logo} src={require("../Image/PhotoFolioLogo.png")} alt="NavbarLogo"/>
            <span>PhotoFolio</span>
        </div>
        </>
    )
}