import Link from "next/link";

// TODO: replace mock data with a real fetch from `/api/products`
// once the products endpoint is implemented on the backend.
type Product = {
  id: string;
  title: string;
  price: number;
  unit: string;
  imageUrl: string;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Frische Erdbeeren",
    price: 4.5,
    unit: "500 g",
    imageUrl:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80",
  },
  {
    id: "2",
    title: "Bio Tomaten",
    price: 3.2,
    unit: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=600&q=80",
  },
  {
    id: "3",
    title: "Honig vom Imker",
    price: 8.9,
    unit: "500 g",
    imageUrl:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
  },
  {
    id: "4",
    title: "Frische Äpfel",
    price: 2.7,
    unit: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
  },
  {
    id: "5",
    title: "Bauernkartoffeln",
    price: 1.9,
    unit: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80",
  },
  {
    id: "6",
    title: "Heidelbeeren",
    price: 5.4,
    unit: "250 g",
    imageUrl:
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=80",
  },
];

const priceFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export default function Home() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">
          Frische Produkte direkt vom Bauernhof
        </h1>
        <p className="text-gray-600 mt-2">
          Entdecken Sie regionale Spezialitäten unserer Landwirte.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <article
            key={product.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-3 flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h2>
              <p className="text-xl font-bold text-green-700">
                {priceFormatter.format(product.price)}
                <span className="text-sm font-normal text-gray-500">
                  {" "}
                  / {product.unit}
                </span>
              </p>
              <Link
                href={`/products/${product.id}`}
                className="mt-auto inline-block text-center bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Details anzeigen
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
