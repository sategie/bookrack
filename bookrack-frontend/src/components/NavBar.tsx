import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";
import styles from "../styles/NavBar.module.css";


export default function NavBar(){

    return (
        <Nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.stickyNav}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">BookRack</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/allbooks">All Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pastreads">Past Reads</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/futurereads">Future Reads</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Nav>
    )
}