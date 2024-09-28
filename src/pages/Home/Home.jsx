// export default Home;
import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import {
  fetchAllCategories,
  fetchGetCategoryById,
} from "../../services/CategoryService";
import {
  fetchGetAllDrinks,
  fetchGetDrinksByCategoryId,
} from "../../services/DrinkService";
import { NumericFormat } from "react-number-format";
import {useTranslation} from 'react-i18next'
import { height, width } from "@fortawesome/free-regular-svg-icons/faAddressBook";


const Home = () => {
  const {t} = useTranslation();
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [category, setCategory] = useState({ name: "Menu" });

  const { id } = useParams();

  const getAllCategories = async () => {
    const res = await fetchAllCategories();

    if (res && res.result) {
      setCategories(res.result);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllDrinks = async () => {
    const res = await fetchGetAllDrinks();

    if (res && res.result) {
      setDrinks(res.result);
    }
  };

  const getDrinksByCategoryId = async (id) => {
    const res = await fetchGetDrinksByCategoryId(id);

    if (res && res.result) {
      setDrinks(res.result);
      console.log("Drink data by category: ", res.result);
    }
  };

  const getCategoryById = async (id) => {
    const res = await fetchGetCategoryById(id);

    if (res && res.result) {
      console.log("Category: ", res.result);
      setCategory(res.result);
    }
  };

  useEffect(() => {
    if (id) {
      getDrinksByCategoryId(id);
      getCategoryById(id);
    } else {
      getAllDrinks();
      setCategory({ name: "Menu" });
    }
  }, [id]);

  return (
    <div className="container mt-3">
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/src/img/1.jpg" className="d-block w-100 rounded-2" alt="" />
            </div>
            <div class="carousel-item">
            <img src="/src/img/2.jpg" className="d-block w-100 rounded-2" alt="" />
            </div>
            <div class="carousel-item">
              <img src="/src/img/3.jpg" className="d-block w-100 rounded-2" alt="" />
            </div>
          </div>
      </div>
      <br />
      <div className="row">
      <h4>{t('Popular Drinks')}</h4>
        <div className="col-md-3">
          <div className="list-group list-group-flush shadow-sm rounded">
            {categories &&
              categories.length &&
              categories.map((category, index) => (
                <NavLink
                  key={`category-${index}`}
                  to={`/menu/category/${category.id}`}
                  className="list-group-item list-group-item-light list-group-item-action border-0"
                >
                  {category.name}
                </NavLink>
              ))}
          </div>
        </div>
        <div className="col-md-9 shadow-sm rounded">
          <div className="category-drink row">
            <h4>{category ? category.name : "Menu"}</h4>
            {drinks &&
              drinks.length &&
              drinks.map((drink, index) => (
                <div
                  className="col-6 col-md-4 col-lg-3 mb-3"
                  key={`drink-${index}`}
                >
                  <div className="card border-0">
                    <img
                      src={drink.images[0]}
                      className="card-img-top h-50"
                      alt={drink.name}
                    />
                    <div className="card-body px-0">
                      <Link to={`/drinks/${drink.id}`} className="nav-link">
                        <h5 className="card-title">{drink.name}</h5>
                      </Link>
                      
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
