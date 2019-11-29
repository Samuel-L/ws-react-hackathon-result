import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = props => {
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <Head>
        <title>React Hackathon</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="container">
        <nav className="py-3">
          <Link href="/products" as="/products">
            <a className="mr-4">All Products</a>
          </Link>
          <Link href="/checkout" as="/checkout">
            <a>Checkout</a>
          </Link>
        </nav>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
