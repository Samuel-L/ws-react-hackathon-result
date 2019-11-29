import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ProductDetail = ({
  id,
  name,
  description,
  price,
  rating,
  stock,
  images,
  reviews
}) => {
  const handleAddToCart = id => {
    const currentStorage = localStorage.getItem("cart");
    let parsedStorage = "";
    if (currentStorage) {
      parsedStorage = JSON.parse(currentStorage);
    }
    const newStorage = [...parsedStorage, id];
    localStorage.setItem("cart", JSON.stringify(newStorage));
  };

  return (
    <div>
      <img
        className="img-fluid w-100"
        style={{ objectFit: "cover", maxHeight: "250px" }}
        src={images && images[0].src["medium"]}
        alt={images && images[0].alt}
      />
      <div className="row d-flex">
        <h1 className="col col-6">{name}</h1>
        <span className="col col-6 text-success align-self-center h1 text-right">
          ${price}
        </span>
      </div>
      <div className="row">
        <div className="col">
          <small className="text-muted mr-4">
            Rated <b>{rating}/5</b>
          </small>
          <small className="text-muted">
            <b>{stock}</b> left in stock!
          </small>
        </div>
      </div>
      <div className="row mt-4 mb-3">
        <p className="col col-12 col-md-6">{description}</p>
        <button
          className="col col-12 col-md-6 btn btn-primary"
          onClick={() => handleAddToCart(id)}
        >
          Add to cart
        </button>
      </div>
      {reviews && reviews.length > 0 ? (
        <>
          <h2>Reviews</h2>
          <div>
            {reviews.map(review => (
              <Review {...review} />
            ))}
          </div>
        </>
      ) : (
        <h2>No reviews at this time</h2>
      )}
    </div>
  );
};

const Review = ({
  author: { name: authorName },
  date,
  description,
  product,
  rating,
  title
}) => {
  return (
    <div class="card mb-3">
      <div class="card-body">
        <div className="d-flex">
          <h3 class="col col-12 col-md-6 card-title pl-0">{title}</h3>
          <span className="col col-12 col-md-6 text-right">
            Rated {rating}/5
          </span>
        </div>
        <p class="card-text">{description}</p>
        <div className="card-text d-flex justify-content-between">
          <small className="text-muted mr-3">
            Written by <b>{authorName}</b> at <b>{date}</b>
          </small>
        </div>
      </div>
    </div>
  );
};

ProductDetail.getInitialProps = async req => {
  const { productId } = req.query;
  const { data } = await axios.get(
    `https://was-react-hackathon-fall-2019.firebaseio.com/products/${productId}.json`
  );

  const { data: reviews } = await axios.get(
    `https://was-react-hackathon-fall-2019.firebaseio.com/reviews/${productId}.json`
  );

  console.log(reviews);

  return { ...data, reviews };
};

export default ProductDetail;
