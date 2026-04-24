export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="section-shell py-10 animate-pulse">
        <div className="h-5 w-32 rounded bg-navy-100 mb-5" />
        <div className="h-10 w-2/3 max-w-xl rounded bg-navy-100 mb-3" />
        <div className="h-4 w-full max-w-2xl rounded bg-navy-100 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="h-44 rounded-lg bg-white border border-navy-100" />
          <div className="h-44 rounded-lg bg-white border border-navy-100" />
          <div className="h-44 rounded-lg bg-white border border-navy-100" />
        </div>
      </div>
    </div>
  )
}
