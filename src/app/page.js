"use client";
import { useState, useEffect } from "react";
import "../../styles/globals.css";
import Card from "./components/card.jsx";
import cardData from "../../data/image.json";

export default function Home({ children }) {
  const card_count = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Push card display events to dataLayer
    card_count.forEach((val) => {
      const card = cardData[val - 1];
      window.dataLayer.push({
        event: "card_display",
        cardTitle: card.title,
        cardPrice: card.price,
      });
    });
  }, []);

  // Push search event to dataLayer
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    window.dataLayer.push({
      event: "search",
      searchTerm: e.target.value,
    });
  };

  return (
    <div className="bg-slate-50 text-black w-screen min-h-screen items-center p-8">
      <div className="flex justify-center text-6xl font-extrabold font-sans pb-10">
        Its12.in{children}
      </div>
      <div className="relative flex justify-end">
        <input
          type="text"
          className="bg-slate-200 px-4 py-2 border-blue-900 rounded-md pr-10 w-1/4"
          onChange={handleSearchChange}
          placeholder="Search🔍"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 bg-blue-600 px-3 rounded-r-md text-white hover:bg-blue-500 border-black"
        >
          🔍
        </button>
      </div>

      <div className="container mx-auto p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {search.length <= 0
          ? card_count.map((val, ind) => (
              <Card
                key={ind}
                card_count={val}
                img={cardData[val - 1].imageUrl}
                price={cardData[val - 1].price}
                title={cardData[val - 1].title}
              />
            ))
          : card_count.map(
              (val, ind) =>
                (cardData[val - 1].title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                  String(cardData[val - 1].price).includes(
                    search.toLowerCase()
                  )) && (
                  <Card
                    key={ind}
                    card_count={val}
                    img={cardData[val - 1].imageUrl}
                    price={cardData[val - 1].price}
                    title={cardData[val - 1].title}
                  />
                )
            )}
      </div>
    </div>
  );
}
