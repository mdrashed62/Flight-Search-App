import React, { useState } from "react";
import { FaPlane, FaHotel, FaCar } from "react-icons/fa";

const Flights = () => {
  const [tripType, setTripType] = useState("Return");
  return (
    <section className="bg-[#032B44] min-h-screen pt-10 text-white p-8 space-y-6 md:pt-28">
      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0062E3] font-semibold">
          <FaPlane /> Flights
        </button>
        <button className="flex items-center gap-2 bg-[#0A3D62] px-4 py-2 rounded-full">
          <FaHotel /> Hotels
        </button>
        <button className="flex items-center gap-2 bg-[#0A3D62] px-4 py-2 rounded-full">
          <FaCar /> Car hire
        </button>
      </div>

      <h1 className="text-3xl font-bold">
        Millions of cheap flights. One simple search.
      </h1>

      <select
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        className="bg-transparent border border-white rounded-lg px-4 py-2"
      >
        <option value="Return" className="text-black">
          Return
        </option>
        <option value="One way" className="text-black">
          One way
        </option>
      </select>

      <form className="rounded-xl gap-1 overflow-hidden relative text-black flex md:flex-row flex-col">
        <div className="flex-1 border-r p-4 bg-white">
          <label className="text-gray-500 text-sm font-bold">From</label>
          <input
            type="text"
            placeholder="Country, city or airport"
            className="w-full outline-none"
          />
        </div>
        <div className="flex-1 border-r p-4 bg-white">
          <label className="text-gray-500 text-sm font-bold">To</label>
          <input
            type="text"
            placeholder="Country, city or airport"
            className="w-full outline-none"
          />
        </div>

        <div className="flex-1 border-r p-4 bg-white">
          <label className="text-gray-500 text-sm font-bold">Depart</label>
          <input type="date" className="w-full outline-none" />
        </div>

        <div className="flex-1 border-r bg-white p-4">
          <label className="text-gray-500 text-sm font-bold">Return</label>
          <input type="date" className="w-full outline-none" />
        </div>

        <div className="flex-1 p-4 border-r bg-white">
          <label className="text-gray-500 text-sm font-bold">
            Travellers and cabin class
          </label>
          <input
            type="text"
            placeholder="2 Travellers, Economy"
            className="w-full outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-[#498AD9] text-white px-6 font-semibold py-3"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default Flights;
