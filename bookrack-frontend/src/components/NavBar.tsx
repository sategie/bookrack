import {useEffect, useState} from 'react'
import { Link, useLocation } from "react-router-dom"
import { Nav } from "react-bootstrap"
import styles from "../styles/NavBar.module.css"

export default function NavBar() {
    const location = useLocation()
    const [activeKey, setActiveKey] = useState<string>(location.pathname || "")

    useEffect(() => {
        setActiveKey(location.pathname || "")
    }, [location])

    return (
        <Nav
            className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.stickyNav}`}
            activeKey={activeKey}
            onSelect={(selectedNav) =>
                selectedNav && setActiveKey(selectedNav)} // Update state when a NavLink is selected
        >
            <div className="container-fluid">
                <Link className={`navbar-brand ${styles.navbarBrand}`} to="/">BookRack</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <Nav.Item className="nav-item">
                            <Nav.Link as={Link} to="/" eventKey="/"
                                      className={`${styles.navLink} ${styles.navItem}`}>
                                Home
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="nav-item">
                            <Nav.Link as={Link} to="/allbooks" eventKey="/allbooks"
                                      className={`${styles.navLink} ${styles.navItem}`}>
                                All Books
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="nav-item">
                            <Nav.Link as={Link} to="/pastreads" eventKey="/pastreads"
                                      className={`${styles.navLink} ${styles.navItem}`}>
                                Past Reads
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="nav-item">
                            <Nav.Link as={Link} to="/futurereads" eventKey="/futurereads"
                                      className={`${styles.navLink} ${styles.navItem}`}>
                                Future Reads
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="nav-item">
                            <Nav.Link as={Link} to="/addbook" eventKey="/addbook"
                                      className={`${styles.navLink} ${styles.navItem}`}>
                                Add Book
                            </Nav.Link>
                        </Nav.Item>
                    </ul>
                </div>
            </div>
        </Nav>
    );
}