import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, maxRating = 5, size = 14, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.floor(rating)
              ? "fill-amber-500 text-amber-500"
              : i < rating
                ? "fill-amber-400/60 text-amber-400"
                : "fill-site-200 text-site-200"
          }
        />
      ))}
    </div>
  );
}
