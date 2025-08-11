
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/31202.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state?.flights) {
      setFlights(state.flights);
      setLoading(false);
    } else {
      setError("No flight data available. Please search again.");
      setLoading(false);
    }
  }, [state]);
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatPrice = (price, currency) => {
    return `${price} ${currency}`;
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="p-6 min-h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg font-semibold">Loading flights...</p>
        </div>
      </div>
    );
  }

  const handleSelectFlight = () => {
    toast.success("Flight selected successfully!");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="p-6 min-h-screen"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex justify-between items-center rounded-full mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-[#498AD9] text-white px-4 rounded-full font-semibold py-2 cursor-pointer"
        >
          ← Back to Search
        </button>
      </div>

      {error ? (
        <div className="text-center">
          <p className="text-red-600 font-bold text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#498AD9] text-white px-6 py-2 rounded-full font-semibold cursor-pointer"
          >
            Search Again
          </button>
        </div>
      ) : flights.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {flights.map((flight, idx) => {
            const itinerary = flight.itineraries[0];
            const firstSegment = itinerary.segments[0];
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];

            return (
              <div
                key={idx}
                className="bg-[#032B44] opacity-90 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-bold md:text-xl">
                      {flight.validatingAirlineCodes[0]}
                    </h2>
                    <div className="text-right">
                      <p className="md:text-2xl  font-bold text-green-400">
                        {formatPrice(flight.price.total, flight.price.currency)}
                      </p>
                      <p className="text-sm text-gray-300">
                        {flight.numberOfBookableSeats} seats left
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">
                          {firstSegment.departure.iataCode}
                        </p>
                        <p className="text-sm text-gray-300">
                          {formatTime(firstSegment.departure.at)}
                        </p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="border-t-2 border-gray-400 relative">
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-center text-xs text-gray-300 mt-2">
                          {itinerary.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {lastSegment.arrival.iataCode}
                        </p>
                        <p className="text-sm text-gray-300">
                          {formatTime(lastSegment.arrival.at)}
                        </p>
                      </div>
                    </div>

                    {itinerary.segments.length > 1 && (
                      <div className="text-center">
                        <p className="text-sm text-gray-300">
                          {itinerary.segments.length - 1} stop
                          {itinerary.segments.length > 2 ? "s" : ""}
                        </p>
                      </div>
                    )}

                    <div className="border-t border-gray-600 pt-3">
                      <p className="text-sm text-gray-300">
                        Flight: {firstSegment.carrierCode} {firstSegment.number}
                      </p>
                      <p className="text-sm text-gray-300">
                        Cabin:{" "}
                        {
                          flight.travelerPricings[0].fareDetailsBySegment[0]
                            .cabin
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSelectFlight}
                  className="w-full mt-4 bg-[#498AD9] text-white py-2 rounded hover:bg-[#3a7bc8] transition-colors cursor-pointer"
                >
                  Select Flight
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-500 font-bold text-lg mb-4">
            No flights found for your search criteria. Please try different dates or destinations.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
