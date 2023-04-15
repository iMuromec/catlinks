import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

import fallbackImage from "../public/images/fallback.png";

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps["src"];
}

export default function ImageWithFallback({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  src = src as string;

  if (!src.startsWith("http") && !src.startsWith("/")) {
    src = fallback;
  }

  return (
    <Image
      alt={alt || ""}
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
}
