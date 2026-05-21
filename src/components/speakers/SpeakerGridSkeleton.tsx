interface SpeakerGridSkeletonProps {
  count?: number;
}

// Placeholder cards shown while speakers are loading from the API.
export const SpeakerGridSkeleton = ({ count = 8 }: SpeakerGridSkeletonProps) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="bg-white/5 rounded-xl overflow-hidden border border-white/10 animate-pulse"
      >
        <div className="aspect-square bg-white/10" />
        <div className="p-3 sm:p-4 space-y-2">
          <div className="h-4 w-3/4 bg-white/10 rounded" />
          <div className="h-3 w-1/2 bg-white/10 rounded" />
          <div className="h-3 w-2/3 bg-white/10 rounded mt-2 pt-2 border-t border-white/10" />
        </div>
      </div>
    ))}
  </div>
);
