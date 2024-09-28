import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { postLogout } from "../../services/AuthService";
import {useTranslation} from 'react-i18next';



const NavBar = () => {
  const {t} = useTranslation();

  const {i18n} = useTranslation()
  const changeLanguage = (lng) =>{
    i18n.changeLanguage(lng)
  }

  const { token, setToken, cart } = useContext(StoreContext);

  const navigator = useNavigate();

  const handleLogout = async () => {
    const res = await postLogout({ token });

    if (res) {
      localStorage.removeItem("token");
      setToken("");
      navigator("/home");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-info border-bottom sticky-top">
      <div className="container row">  
          <div className="col-md-1"></div>
          <div className="col-md-4 mx-3">
          <NavLink className="navbar-brand text-dark " to={"/home"}>
          <h4>PHÁT AN NHIÊN</h4>
          All Nutrition Products
        </NavLink>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-5">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/home"}>
              {t('navHome')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/menu"}>
              {t('navMenu')}
              </NavLink>
            </li>

            {token && (
              <li className="nav-item">
                <NavLink className="nav-link" to={"/order"}>
                {t('navContact')}
                </NavLink>
              </li>
            )}
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {t('navLanguage')}
          </a>
          <ul class="dropdown-menu">
            <li><a className="btn"  
                    onClick={() => changeLanguage('vi')} href="#">{t('language1')} <img src="/src/img/coVietNam.png" alt="" width={20} /></a>
            </li>
            <li><a className="btn"
                    onClick={() => changeLanguage('en')} href="#">{t('language2')} <img src="/src/img/coNuocAnh.png" alt="" width={20} /></a>
            </li>
            <li><a className="btn"  
                    onClick={() => changeLanguage('cn')} href="#">{t('language3')} <img src="/src/img/coNuocTrung.webp" alt="" width={20} /></a>
            </li>
          </ul>
        </li>
          </ul>
            
          <ul className="navbar-nav">
            {!token ? (
              <li className="nav-item">
                <Link className="nav-link " to={"/login"}>
                  <button
                    className="btn btn-outline-secondary rounded-5"
                    style={{ fontSize: 13, fontWeight: 500 }}
                  >
                    {t('navLogin')}
                  </button>
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg-end">
                  <li>
                    <NavLink className="dropdown-item" to={"/profile"}>
                    {t('navProfile')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to={"/change-password"}>
                    {t('navChangepassword')}
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                    {t('navLogout')}
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
