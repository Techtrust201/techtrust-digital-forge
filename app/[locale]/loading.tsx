export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="text-center">
        <div className="relative mx-auto mb-6 h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
        </div>
        <p className="text-lg font-medium text-gray-700">Chargement en cours…</p>
        <p className="mt-1 text-sm text-gray-500">Merci de patienter quelques instants</p>
      </div>
    </div>
  );
}
