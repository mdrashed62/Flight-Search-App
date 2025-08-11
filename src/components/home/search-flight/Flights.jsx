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

  // Autocomplete state
  const [originQuery, setOriginQuery] = useState("");
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [originLoading, setOriginLoading] = useState(false);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const fetchLocations = async (query, setter, loadingSetter) => {
    if (!query || query.length < 2) {
      setter([]);
      return;
    }
    loadingSetter(true);
    try {
      const token = await getAccessToken();
      const response = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${encodeURIComponent(
          query
        )}&page[limit]=10&view=FULL`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const formattedResults = data.data.map((item) => ({
          id: item.id,
          name: item.name,
          iataCode: item.iataCode,
          subType: item.subType,
          address: item.address,
          displayName: `${item.name}${
            item.address?.cityName ? `, ${item.address.cityName}` : ""
          } (${item.iataCode})`,
        }));
        setter(formattedResults);
      } else {
        setter([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setter([]);
    } finally {
      loadingSetter(false);
    }
  };

  const handleOriginInput = (e) => {
    setOriginQuery(e.target.value);
    fetchLocations(e.target.value, setOriginOptions, setOriginLoading);
  };
  const handleDestinationInput = (e) => {
    setDestinationQuery(e.target.value);
    fetchLocations(
      e.target.value,
      setDestinationOptions,
      setDestinationLoading
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.origin || !formData.destination) {
      alert("Please select both origin and destination cities/airports.");
      return;
    }

    if (!formData.departureDate) {
      alert("Please select a departure date.");
      return;
    }

    const selectedDate = new Date(formData.departureDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a future date for departure.");
      return;
    }

    setLoading(true);
    console.log("Form data being sent:", formData);

    try {
      const token = await getAccessToken();
      console.log("Token received:", token ? "Yes" : "No");

      const query = new URLSearchParams({
        originLocationCode: formData.origin,
        destinationLocationCode: formData.destination,
        departureDate: formData.departureDate,
        adults: formData.passengers,
        currencyCode: "USD",
        max: 10,
      });

      const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?${query}`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.data && data.data.length > 0) {
        console.log("Found flights:", data.data.length);
        navigate("/results", { state: { flights: data.data } });
      } else {
        console.log("No flights found in response");
        alert(
          "No flights found for your search criteria. Please try different dates or destinations."
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert(`Error searching flights: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#032B44] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gamd:p-4">
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
      <div className="flex gamd:p-4">
        <button className="flex items-center gap-2 px-2 py-2 rounded-full bg-[#0062E3] font-semibold">
          <FaPlane /> Flights
        </button>
        <button className="flex items-center gap-2 bg-[#0A3D62] px-2 py-2 rounded-full">
          <FaHotel /> Hotels
        </button>
        <button className="flex items-center gap-2 bg-[#0A3D62] px-2 py-2 rounded-full">
          <FaCar /> Car
        </button>
      </div>
      <h1 className="text-3xl font-bold">
        Discover Affordable Flights, Tailored for You.
      </h1>
      <form
        onSubmit={handleSubmit}
        className="rounded-xl gap-1 relative text-black flex md:flex-row flex-col md:mt-20"
      >
        <div className="flex-1 border-r rounded-sm md:p-4 py-1 px-2  bg-white relative">
          <label className="text-gray-500 text-sm font-bold ">Origin</label>
          <input
            name="origin"
            value={originQuery}
            onChange={handleOriginInput}
            type="text"
            placeholder="City or Airport"
            className="w-full outline-none"
            autoComplete="off"
            required
            style={{ position: "relative", zIndex: 60 }}
          />
          {originLoading && (
            <div className="absolute left-0 right-0 bg-white z-50 p-2 text-xs border-b">
              Loading...
            </div>
          )}
          {originOptions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white z-50 border mt-1 max-h-60 overflow-y-auto shadow-lg rounded-b">
              {originOptions.map((opt) => (
                <li
                  key={opt.id}
                  className="p-2 hover:bg-blue-100 cursor-pointer flex flex-col"
                  onClick={() => {
                    setFormData({ ...formData, origin: opt.iataCode });
                    setOriginQuery(opt.displayName);
                    setOriginOptions([]);
                  }}
                >
                  <span className="font-semibold">{opt.displayName}</span>
                  <span className="text-xs text-gray-500">
                    {opt.subType === "CITY" ? "City" : "Airport"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-1 border-r md:p-4 rounded-sm py-1 px-2 bg-white relative">
          <label className="text-gray-500 text-sm font-bold">Destination</label>
          <input
            name="destination"
            value={destinationQuery}
            onChange={handleDestinationInput}
            type="text"
            placeholder="City or Airport"
            className="w-full outline-none"
            autoComplete="off"
            required
            style={{ position: "relative", zIndex: 60 }}
          />
          {destinationLoading && (
            <div className="absolute left-0 right-0 bg-white z-50 p-2 text-xs border-b">
              Loading...
            </div>
          )}
          {destinationOptions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white z-50 border mt-1 max-h-60 overflow-y-auto shadow-lg rounded-b">
              {destinationOptions.map((opt) => (
                <li
                  key={opt.id}
                  className="p-2 hover:bg-blue-100 cursor-pointer flex flex-col"
                  onClick={() => {
                    setFormData({ ...formData, destination: opt.iataCode });
                    setDestinationQuery(opt.displayName);
                    setDestinationOptions([]);
                  }}
                >
                  <span className="font-semibold">{opt.displayName}</span>
                  <span className="text-xs text-gray-500">
                    {opt.subType === "CITY" ? "City" : "Airport"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-1 border-r md:p-4 py-1 px-2 rounded-sm bg-white">
          <label className="text-gray-500 text-sm font-bold">Date</label>
          <input
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full outline-none"
            required
          />
        </div>
        <div className="flex-1 md:p-4 border-r rounded-sm py-1 px-2 bg-white">
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
          className="bg-[#498AD9] md:p-4 text-white px-6 py-4 rounded-sm  font-semibold cursor-pointer"
        >
          Search
        </button>
      </form>
    </section>
  );
};

export default Flights;
