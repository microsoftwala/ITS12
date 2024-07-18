"use client";
import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { MyContext } from "../providers/Myprovider";
import cardData from "../../../data/image.json";

const page = () => {
  const { state, insertOrUpdateKeyValuePair, removeKeyValuePair, counts } =
    useContext(MyContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const img = searchParams.get("img");
  const count = searchParams.get("count");
  const price = searchParams.get("price");
  const title = searchParams.get("title");
  const [total, setTotal] = useState(0);
  const [Count, setCount] = useState(0);

  useEffect(() => {
    // insertOrUpdateKeyValuePair(title, 0, count);
    if (state && state.length > 0) {
      const newTotal = state.reduce((acc, val) => acc + val?.value, 0);
      setTotal(newTotal);
    }
    if (counts && counts.length > 0) {
      const newTotal = counts.reduce((acc, val) => acc + val?.count, 0);
      setCount(newTotal);
    }
  }, [state,counts]);
  console.log("Total Product", state,counts);

  return (
    <div className="bg-gray-100 min-h-screen p-8 w-screen flex flex-col">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-auto mb-auto">
        <div className="relative">
          <button
            className="absolute top-[-5px] md:text-2xl text-xl font-bold mb-4 text-white bg-blue-700 px-4 py-1 rounded-md hover:bg-blue-800"
            onClick={() =>
              router.push(`/Cart?img=${img}&price=${price}&title=${title}`)
            }
          >
            Back
          </button>
        </div>
        <div className="text-black justify-center flex font-bold md:text-3xl text-2xl pb-5">
          Your Cart
        </div>
        {state && state.length > 0 ? (
          <div className="flex flex-col lg:flex-row mb-4 text-black">
            <div className="lg:w-2/3 w-full p-4 border rounded-lg bg-white shadow-sm text-black mb-4 lg:mb-0 overflow-y-auto h-96">
              {state &&
                state.length > 0 &&
                state.map((item, index) => (
                  <div key={index} className="flex items-start mb-4">
                    {cardData
                      .filter((data) => item?.key === data.title)
                      .map((filteredData, index) => (
                        <div>
                          <img
                            key={index}
                            src={filteredData.imageUrl}
                            alt={filteredData.title}
                            className="w-44 h-44 rounded-sm cursor-pointer"
                            onClick={()=> router.push(`/Cart?img=${filteredData.imageUrl}&price=${filteredData.price}&title=${filteredData.title}`)}
                          />
                        </div>
                      ))}
                    <div className="ml-4">
                      <h2 className="text-lg font-bold">
                        {item?.key}({counts[index]?.count})
                      </h2>
                      <p className="text-gray-500">LOREM IPSUM HAI</p>

                      <p className="text-gray-500">Seller: Akshnav Online</p>
                      <div className="flex">
                        <p className="text-red-600 font-bold mt-2">
                          ₹{item?.value}{" "}
                          <span className="text-gray-600 font-bold mt-2 line-through">
                            {1000 * counts[index]?.count}{" "}
                          </span>
                        </p>
                      </div>
                      <p className="text-green-600 mt-2">
                        Delivery by Fri Jul 19 | Free
                      </p>
                      <button
                        className="bg-red-600 text-white font-semibold px-2 rounded-lg py-1"
                        onClick={() => removeKeyValuePair(item?.key)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="lg:w-1/3 w-full lg:pl-4 text-black">
              <div className="p-4 border rounded-lg bg-white shadow-sm">
                <h2 className="text-lg font-bold mb-4">PRICE DETAILS</h2>
                <div className="flex justify-between mb-2">
                  <p>Price (total items)</p>
                  <p>₹{Count * 1000}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Discount</p>
                  <p className="text-green-600">-₹{Count * 1000 - total}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Delivery Charges</p>
                  <p className="text-green-600">Free</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-2">
                  <p>Total Amount</p>
                  <p>₹{total}</p>
                </div>
                <p className="text-green-600">
                  You will save ₹{Count * 1000 - total} on this order
                </p>
              </div>
              <div className="mt-4">
                <button className="w-full bg-orange-500 text-white py-3 rounded">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-600 font-serif text-4xl flex justify-center font-bold pt-10 pb-10">
            No Items Added
          </div>
        )}

        <p className="text-gray-500 mt-4 text-center">
          Safe and Secure Payments. Easy returns. 100% Authentic products.
        </p>
      </div>
    </div>
  );
};

export default page;
