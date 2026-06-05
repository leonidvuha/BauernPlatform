export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">BauernPlatform</span>
          <span className="text-green-300 text-sm">— Frische Produkte direkt vom Bauernhof</span>
        </div>
        <p className="text-green-300 text-sm">© 2026 BauernPlatform</p>
      </div>
    </footer>
  );
}