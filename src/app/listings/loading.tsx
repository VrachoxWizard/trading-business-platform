export default function ListingsLoading() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="section-shell py-8 animate-pulse">
        <div className="h-5 w-40 rounded bg-navy-100 mb-4" />
        <div className="h-10 w-80 rounded bg-navy-100 mb-3" />
        <div className="h-4 w-full max-w-2xl rounded bg-navy-100 mb-8" />
        <div className="h-16 rounded-lg bg-white border border-navy-100 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-72 rounded-lg bg-white border border-navy-100" />
          <div className="h-72 rounded-lg bg-white border border-navy-100" />
          <div className="h-72 rounded-lg bg-white border border-navy-100" />
        </div>
      </div>
    </div>
  )
}
