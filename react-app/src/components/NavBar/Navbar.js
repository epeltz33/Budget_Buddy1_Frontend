import react from 'react';
import { Navlink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser)
    return (
      <nav className="NavBar" style={{ width: "97%" }}>
        <span id="NavBarLogo">
          <i
            class="fa-solid fa-cheese"
            style={{ marginRight: 3, marginLeft: 2 }}
          ></i>
          CHEDDAR
        </span>
        <ul>
          <li>
            <span id="WelcomeMessage">{`Welcome, ${sessionUser.username}!`}</span>
          </li>
          <li style={{ marginLeft: 8 }} className="NavBarDivider">
            |
          </li>
          <li>
            <NavLink to="/">
              <button>
                Home <i className="fa-solid fa-house" />
              </button>
            </NavLink>
          </li>
          <li className="NavBarDivider">|</li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    );

  return (
    <nav className="NavBar" style={{ display: "block" }}>
      <ul style={{ justifyContent: "space-around", marginTop: 5 }}>
        <li>
          <NavLink to="/">
            <button>
              Home <i className="fa-solid fa-house" />
            </button>
          </NavLink>
        </li>
        <li className="NavBarDivider">|</li>
        <li>
          <NavLink to="/login">
            <button>
              Login <i class="fa-solid fa-right-to-bracket" />
            </button>
          </NavLink>
        </li>
        <li className="NavBarDivider">|</li>
        <li>
          <NavLink to="/sign-up">
            <button>
              Sign Up <i class="fa-solid fa-user-plus" />
            </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;