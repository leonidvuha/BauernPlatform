"use client";
import { useState, useEffect, startTransition, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { GERMAN_CITIES } from "@/utils/germanCities";
import { useCategoriesStore } from "@/store/categoriesStore";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const { categories } = useCategoriesStore();

  const urlLat = searchParams.get("lat");
  const urlLng = searchParams.get("lng");
  const urlRadius = searchParams.get("radius");

  const [searchText, setSearchText] = useState(
    searchParams.get("search") ?? "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "",
  );
  const [lat, setLat] = useState<number | null>(urlLat ? Number(urlLat) : null);
  const [lng, setLng] = useState<number | null>(urlLng ? Number(urlLng) : null);
  const [radius, setRadius] = useState<number>(
    urlRadius ? Number(urlRadius) : 25,
  );
  const [locationLabel, setLocationLabel] = useState<string>(
    urlLat && urlLng ? "Gespeicherter Standort" : "",
  );

  const profileInitRef = useRef(false);
  const userSetLocationRef = useRef(!!urlLat);

  const findNearestCity = (lat: number, lng: number): string => {
    let nearest = "";
    let minDist = Infinity;
    GERMAN_CITIES.forEach((city) => {
      const d = Math.sqrt((city.lat - lat) ** 2 + (city.lng - lng) ** 2);
      if (d < minDist) {
        minDist = d;
        nearest = city.name;
      }
    });
    return nearest;
  };

  useEffect(() => {
    if (
      !profileInitRef.current &&
      !userSetLocationRef.current &&
      user?.lat &&
      user?.lng
    ) {
      profileInitRef.current = true;
      startTransition(() => {
        setLat(Number(user.lat));
        setLng(Number(user.lng));
        const nearest = findNearestCity(Number(user.lat), Number(user.lng));
        setLocationLabel(`${nearest} (Mein Profil)`);
      });
    }
  }, [user]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    userSetLocationRef.current = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        const nearest = findNearestCity(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        setLocationLabel(`${nearest} (Mein Standort)`);
      },
      () => {},
    );
  };

  const handleCitySelect = (cityName: string) => {
    userSetLocationRef.current = true;
    const city = GERMAN_CITIES.find((c) => c.name === cityName);
    if (city) {
      setLat(city.lat);
      setLng(city.lng);
      setLocationLabel(cityName);
    }
  };

  const handleLocationSelect = (value: string) => {
    if (value === "GEOLOCATE") handleGetLocation();
    else if (value) handleCitySelect(value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (selectedCategory) params.set("category", selectedCategory);
    else params.delete("category");
    if (searchText) params.set("search", searchText);
    else params.delete("search");
    if (lat && lng) {
      params.set("lat", String(lat));
      params.set("lng", String(lng));
      params.set("radius", String(radius));
    } else {
      params.delete("lat");
      params.delete("lng");
      params.delete("radius");
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearLocation = () => {
    setLat(null);
    setLng(null);
    setLocationLabel("");
  };

  const clearFilters = () => {
    setSearchText("");
    clearLocation();
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="my-6 max-w-5xl mx-auto px-4">
      <div className="bg-green-700 rounded-2xl p-3 flex items-center gap-3">
        <div className="flex-1 flex items-center bg-white rounded-xl">
          <div className="relative flex-1 min-w-[150px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Produkt suchen..."
              className="w-full pl-10 pr-3 py-3 text-sm focus:outline-none"
            />
          </div>

          <div className="w-px h-8 bg-gray-200 flex-shrink-0" />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-3 text-sm text-gray-600 focus:outline-none bg-transparent cursor-pointer"
          >
            <option value="">Alle Kategorien</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="w-px h-8 bg-gray-200 flex-shrink-0" />

          {lat && lng ? (
            <div className="flex items-center gap-1 px-3 text-sm text-green-700 whitespace-nowrap">
              <span>📍 {locationLabel} </span>
              <button
                onClick={clearLocation}
                className="text-gray-400 hover:text-gray-600 ml-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <select
              value=""
              onChange={(e) => handleLocationSelect(e.target.value)}
              className="px-3 py-3 text-sm text-gray-600 focus:outline-none bg-transparent cursor-pointer"
            >
              <option value="">Standort oder Stadt wählen...</option>
              <option value="GEOLOCATE">📍 Meinen Standort verwenden</option>
              {GERMAN_CITIES.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          )}

          <div className="w-px h-8 bg-gray-200 flex-shrink-0" />

          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="px-3 py-3 text-sm text-gray-600 focus:outline-none bg-transparent cursor-pointer"
          >
            <option value={10}>im Radius 10 km</option>
            <option value={25}>im Radius 25 km</option>
            <option value={50}>im Radius 50 km</option>
            <option value={100}>im Radius 100 km</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-white text-green-700 font-medium text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition whitespace-nowrap"
        >
          Suchen
        </button>

        {(searchParams.get("search") || searchParams.get("lat")) && (
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white text-sm font-medium px-4 py-3 rounded-xl hover:bg-red-600 transition whitespace-nowrap"
          >
            ✕ Zurücksetzen
          </button>
        )}
      </div>
    </div>
  );
}
