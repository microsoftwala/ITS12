"use client";
import React, { useState, useContext,useEffect } from "react";
import Card from "../components/card";
import { useSearchParams } from "next/navigation";
import "../../../styles/card.css";
import { useRouter } from "next/navigation";
import { MyContext } from "../providers/Myprovider";

const page = () => {
  const {
    state,
    insertOrUpdateKeyValuePair,
    removeKeyValuePair,
    counts,
  } = useContext(MyContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const img = searchParams.get("img");
  const price = searchParams.get("price");
  const title = searchParams.get("title");
  const [pin, setPin] = useState();
  const [count, setCount] = useState(1);

  const handleInsert = () => {
    insertOrUpdateKeyValuePair(title, count * price, count);
    console.log("Hiiiii")
    if (count > 0) {
      router.push(
        `/Cart1?img=${img}&count=${count}&price=${price}&title=${title}`
      );
    }
  };

  useEffect(() => {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    // Push card display events to dataLayer
    
      window.dataLayer.push({
        event: "Current_card_display",
        cardTitle: title,
        cardPrice: price,
      });
  }, []);

  return (
    <div className="min-w-screen mx-auto p-4 bg-gradient-to-t from-white via-slate-200 to-white text-black min-h-screen flex flex-col">
      <div className="relative">
        <button
          className="absolute h-10 font-semibold text-xl bg-blue-700 px-4 rounded-md text-white hover:bg-blue-800"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
      <div className="text-4xl flex justify-center font-semibold mt-auto mb-auto pb-4">
        Its12/Products
      </div>
      <div className="lg:flex mt-auto mb-auto">
        <div className="lg:w-1/2">
          <img
            src={img}
            alt="Product Image"
            className="rounded shadow-lg shadow-gray-700 w-full"
          />
          <div className="flex justify-center mt-6  pb-6">
            <img
              src={img}
              alt="Product Image"
              className="rounded w-1/5 shadow-lg shadow-gray-800"
            />
          </div>
        </div>
        <div className="md:bg-slate-50 md:w-[1px] ml-2"></div>
        <div className="lg:w-1/2 pl-4">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-2xl text-red-600 mb-4">
            ₹ {price} <span className="line-through text-gray-500">₹ 1000</span>
          </p>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="ml-2 text-sm text-purple-500">0 reviews</span>
            </div>
            <p className="mb-4">
              3D Acrylic Multi Led Teddy Name Lamp is the best gift which
              provide the beautiful color lightnings across itself. Single color
              Size 7 Inches This optical illusion lamp is the perfect decorative
              piece for any home or office.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Destination Delivery Check (Pincode)
              </label>
              <input
                type="text"
                placeholder="######"
                className="p-2 border rounded w-full text-black"
                onChange={(e) => setPin(e.target.value)}
              />
              {(pin === "600127" || pin === "274001") && (
                <p className="text-green-500 mt-2">
                  Yay! This product is deliverable to this pincode!
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Upload Personalized Image
              </label>
              <input type="file" className="p-2 border rounded w-full" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-start">
              {count >= 2 && (
                <button
                  className="bg-red-500 text-white px-4 py-2 font-bold hover:bg-red-600"
                  onClick={() => setCount((prev) => prev - 1)}
                >
                  -
                </button>
              )}
              <div className="bg-red-500 text-white px-4 py-2 font-bold">
                {count}
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 font-bold hover:bg-red-600"
                onClick={() => setCount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <div>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={handleInsert}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
