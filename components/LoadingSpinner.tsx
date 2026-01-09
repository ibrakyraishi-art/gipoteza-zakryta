export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan"></div>
        <div className="absolute top-0 left-0 animate-ping rounded-full h-12 w-12 border border-accent-cyan opacity-20"></div>
      </div>
    </div>
  )
}
