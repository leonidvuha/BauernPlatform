export default function SearchBar() {
  return (
    <div className="my-6">
      <div className="relative max-w-2xl mx-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Produkt suchen..."
          readOnly
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none bg-white shadow-sm cursor-not-allowed"
        />
      </div>
    </div>
  );
}