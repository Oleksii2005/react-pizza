import React from "react";
import { Link } from "react-router-dom";
import bucketEmptyImg from "../../assets/img/empty-bucket.png";
export const EmptyBucket = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Cart is empty <span>😕</span>
        </h2>
        <p>
          Most likely, you haven't ordered pizza yet.
          <br />
          To order pizza, go to the main page.
        </p>
        <img src={bucketEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </>
  );
};
