import React, { useState } from "react";
import { FaPlane, FaHotel, FaCar } from "react-icons/fa";
import { getAccessToken } from "../../../utils/getToken";
import { useNavigate } from "react-router";

const Flights = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getAccessToken();
      const query = new URLSearchParams({
        originLocationCode: formData.origin,
        destinationLocationCode: formData.destination,
        departureDate: formData.departureDate,
        adults: formData.passengers,
        currencyCode: "USD",
        max: 10,
      });

      const response = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.data) {
        navigate("/results", { state: { flights: data.data } });
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#032B44] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg font-semibold">
            Searching flights...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#032B44] min-h-screen pt-10 text-white p-8 space-y-6 md:pt-24">
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0062E3] font-semibold">
          <FaPlane /> Flights
        </button>
        <button className="flex items-center gap-2 bg-[#0A3D62] px-4 py-2 rounded-full">
          <FaHotel /> Hotels
        </button>
        <button className="flex items-center gap-2 bg-[#0A3D62] px-4 py-2 rounded-full">
          <FaCar /> Car
        </button>
      </div>

      <h1 className="text-3xl font-bold">
        Millions of cheap flights. One simple search.
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl gap-1 overflow-hidden relative text-black flex md:flex-row flex-col md:mt-20"
      >
        <div className="flex-1 border-r p-4 bg-white">
          <label className="text-gray-500 text-sm font-bold">Origin</label>
          <input
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            type="text"
            placeholder="IATA code (e.g., DAC)"
            className="w-full outline-none"
            required
          />
        </div>
        <div className="flex-1 border-r p-4 bg-white">
          <label className="text-gray-500 text-sm font-bold">Destination</label>
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            type="text"
            placeholder="IATA code (e.g., DXB)"
            className="w-full outline-none"
            required
          />
        </div>

        <div className="flex-1 border-r p-4 bg-white">
          <label className="text-gray-500 text-sm font-bold">Date</label>
          <input
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            type="date"
            className="w-full outline-none"
            required
          />
        </div>

        <div className="flex-1 p-4 border-r bg-white">
          <label className="text-gray-500 text-sm font-bold">Travellers</label>
          <input
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            type="number"
            min="1"
            className="w-full outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-[#498AD9] text-white px-6 font-semibold py-6"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default Flights;
