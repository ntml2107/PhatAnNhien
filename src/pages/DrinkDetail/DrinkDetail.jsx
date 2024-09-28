import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchGetDrinkById,
  fetchGetDrinksByCategoryId,
} from "../../services/DrinkService";
import { fetchGetAllReview } from "../../services/ReviewService";
import { StoreContext } from "../../context/StoreContext";
import { Field, Form, Formik } from "formik";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next";
const DrinkDetail = () => {
  const { t } = useTranslation();
  const [drink, setDrink] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [drinkPrice, setDrinkPrice] = useState(0);
  const [toppingPrice, seTtoppingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  const [reviews, setReviews] = useState([]);
  const [initialValues, setInitialValues] = useState({
    drinkId: "",
    sizeId: "",
    toppings: [],
    price: "",
  });

  const { addToCart } = useContext(StoreContext);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDrinkById(id);
    }
  }, [id]);

  console.log("Initial Values: ", initialValues);

  useEffect(() => {
    setTotalPrice(drinkPrice + toppingPrice);
  }, [drinkPrice, toppingPrice]);

  const getDrinkById = async (id) => {
    const res = await fetchGetDrinkById(id);

    if (res && res.result) {
      const drink = res.result;
      console.log(drink);
      setDrink(drink);
      setTotalPrice(drink.price);
      setDrinkPrice(drink.price);
      getDrinksByCategoryId(drink.category.id);

      setInitialValues({
        drinkId: id,
        sizeId: "",
        toppings: [],
        price: "",
      });
    }
  };

  const getDrinksByCategoryId = async (id) => {
    const res = await fetchGetDrinksByCategoryId(id);

    if (res && res.result) {
      setDrinks(res.result);
      console.log("Drink data by category: ", res);
    }
  };

  useEffect(() => {
    getAllReview();
  }, []);

  const getAllReview = async () => {
    const res = await fetchGetAllReview();
    if (res && res.result) setReviews(res.result);
  };

  const onSubmit = (values) => {
    console.log("Form values: ", values);
    const cartItem = { ...values, drinkId: id, price: totalPrice, quantity: 1 };
    console.log("Cart item: ", cartItem);
    addToCart(cartItem);
  };

  return (
    <div className="container mt-3 shadow-sm rounded py-3">
      <div className="row">
        <div className="card mb-3 border-0 ">
          <div className="row g-0">
            <div className="col-md-6">
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  {drink &&
                    drink.images &&
                    drink.images.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index == 0 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <img
                          src={image}
                          className="d-block w-100 "
                          alt="Drink image preview"
                        />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-body pt-0">
                <h3 className="card-title text-center">{drink.name}</h3>
                <h4 className="card-title" style={{ color: "#E57905" }}>
                </h4>
                <hr />
                <h4 className="card-title">{t("menuDescription")}</h4>
                <p className="card-text">{drink.description}</p>
              </div>
              <hr />
              <div className="text-center"><a href=""> {t("contact")}</a></div>
            </div>
          </div>
        </div>
        <div className="card border-0">
          {/* <hr />
          <h4 className="card-title">{t("menuDescription")}</h4>
          <p className="card-text">{drink.description}</p>
          <hr /> */}
        </div>
        <div className="card border-0">
          <h4 className="card-title">{t("menuRelatedDrink")}</h4>
          <div className="related-drink row">
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

export default DrinkDetail;
