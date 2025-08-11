// src/pages/ResultsPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("");
  const flights = state?.flights || [];

  const handleSort = (type) => {
    setSortType(type);
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortType === "price") {
      return parseFloat(a.price.total) - parseFloat(b.price.total);
    }
    if (sortType === "departure") {
      return new Date(a.itineraries[0].segments[0].departure.at) - new Date(b.itineraries[0].segments[0].departure.at);
    }
    return 0;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ← Back to Search
        </button>
        <div className="flex gap-3">
          <select
            value={sortType}
            onChange={(e) => handleSort(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="">Sort By</option>
            <option value="price">Lowest Price</option>
            <option value="departure">Earliest Departure</option>
          </select>
        </div>
      </div>

    
      {sortedFlights.length ? (
        <div className="grid gap-4 md:grid-cols-4 grid-cols-1">
          {sortedFlights.map((flight, idx) => {
            const offer = flight.itineraries[0].segments[0];
            return (
              <div key={idx} className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold text-lg">
                  Airline: {offer.carrierCode}
                </h2>
                <p>
                  From: {offer.departure.iataCode} - To: {offer.arrival.iataCode}
                </p>
                <p>Departure: {offer.departure.at}</p>
                <p>Arrival: {offer.arrival.at}</p>
                <p>
                  Price: {flight.price.total} {flight.price.currency}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600">No flights found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
