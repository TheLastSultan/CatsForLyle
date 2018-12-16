import React from 'react';
import { Link, NavLink } from "react-router-dom";

function navbar() {
    return (
        <div>
            <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
                <a class="navbar-brand" href="#">CatsForLyle</a>
                <ul className="navbar-nav">
                    <li className="nav-item-active">
                        <Link to={`/login`}>
                            <button title="upload" className="btn btn-success">
                                Login
                        </button>
                        </Link>
                    </li>

                    <li className="nav-item-active">
                        <Link to={`/signup`}>
                            <button
                                title="signup"
                                className="btn btn-primary"
                            >
                                Signup
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default navbar;

