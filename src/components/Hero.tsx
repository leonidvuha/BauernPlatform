import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative rounded-2xl overflow-hidden mb-10"
      style={{ minHeight: 320 }}
    >
      <Image
        src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1400&q=80"
        alt="Bauernhof platform"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-green-900 opacity-50" />
      <div
        className="relative z-10 flex flex-col justify-end h-full px-8 py-12"
        style={{ minHeight: 320 }}
      >
        <h1 className="text-5xl font-bold text-white text-center leading-tight">
          Frische Produkte direkt vom Bauernhof
        </h1>
        <p className="text-2xl font-semibold text-green-200 text-center w-full">
          Dein Marktplatz zum Kaufen und Verkaufen!
        </p>
      </div>
    </section>
  );
}
