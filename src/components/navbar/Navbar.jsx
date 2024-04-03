import { FaSearch } from "react-icons/fa";
import styles from './Navbar.module.scss';
import { useRef } from "react";
import LogoutUserComponent from "../logoutUser/LogoutUserComponent";
import { searchItems } from "../../helper/ApiCallFunctions";


const Navbar = ({ openLoginModal, setCategoryNotes, setAnyChange }) => {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const searchRef = useRef();
    const isLoggedIn = !!token;

    function handleSearch() {
        if (isLoggedIn) searchItems(searchRef.current.value.trim(), setCategoryNotes);
    }

    return <nav className={styles.navbar}>
        <h2>NotesApp</h2>
        <form action="">
            <input ref={searchRef} onChange={handleSearch} type="search" placeholder="Search Your Notes" />
            <FaSearch className={styles.searchIcon} />
        </form>
        {isLoggedIn ? <LogoutUserComponent setAnyChange={setAnyChange} /> : <button onClick={openLoginModal} className={styles.loginButton}>Login</button>}
    </nav>
}

export default Navbar;