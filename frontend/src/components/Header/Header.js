import * as React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

function Header () {
    return (
      <header>
          <nav>
            <ul>
              <a href="https://stabelo.se" >
                  <img  src="https://s3.eu-central-1.amazonaws.com/static.stabelo.net.eu-central-1/Stabelo_logo_RGB.png" alt="Stabelo" />
              </a>
              <li>
                <Link to="/about">Om uppgiften</Link>
              </li>
              <li>
                <Link to="/implementation">Implementation</Link>
              </li>
            </ul>
          </nav>
      </header>
    );
}

export default Header;
