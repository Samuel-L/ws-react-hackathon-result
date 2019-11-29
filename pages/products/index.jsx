import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

const ProductList = ({ data }) => {
  return (
    <main>
      <div className="row">
        {data &&
          Object.keys(data).map((productID, index) => (
            <div className="col col-12 col-md-6 col-lg-4">
              <Product key={`${productID}${index}`} {...data[productID]} />
            </div>
          ))}
      </div>
    </main>
  );
};

const Product = ({ id, name, description, price, rating, stock, images }) => {
  return (
    <Link href={`/products/[productId]`} as={`/products/${id}`} passHref>
      <a className="text-decoration-none">
        <div className="card mb-3">
          <img
            className="card-img-top"
            src={images && images[0].src["medium"]}
            alt={images && images[0].alt}
          />
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="card-title mb-0">{name}</h5>
              <p className="text-success mb-0">${price}</p>
            </div>
            <p className="card-text">{description}</p>
            <div className="card-text d-flex justify-content-between">
              <small className="text-muted mr-3">
                Rated <b>{rating}/5</b>
              </small>
              <small className="text-muted">
                <b>{stock}</b> left in stock!
              </small>
            </div>
          </div>
        </div>
        <style jsx>{`
          a:hover {
            text-decoration: none;
          }
        `}</style>
      </a>
    </Link>
  );
};

ProductList.getInitialProps = async () => {
  const { data } = await axios.get(
    "https://was-react-hackathon-fall-2019.firebaseio.com/products.json"
  );
  return { data: data };
};

export default ProductList;
