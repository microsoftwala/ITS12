"use client";
import React from "react";
import "../../../styles/card.css";
import { useRouter } from "next/navigation";

const Card = ({ price, img, title }) => {
  const router = useRouter();
  return (
    <div className="flex items-center rounded-lg">
      <div className="container">
        <div className="card">
          <div className="image-wrapper cursor-pointer">
            <img alt="traveller" src={img} />
          </div>
          <div className="content">
            <h2 className="font-bold">{title}</h2>
            <div className="flex justify-evenly">
              <p>Price:{price}</p>
              <button onClick={() => router.push(`/Cart?img=${img}&price=${price}&title=${title}`)} className="bg-green-700 rounded-lg px-2 text-gray-800 hover:bg-green-600 hover:font-semibold">
                Go to Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
