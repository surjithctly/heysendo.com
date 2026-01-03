"use client";

import Image from "next/image";

type FeatureCardProps = {
  title?: string;
  content?: string;
  imageLightSrc?: string;
  imageDarkSrc?: string;
  imageSrc?: string;
};

export function FeatureCard({
  title,
  content,
  imageLightSrc,
  imageDarkSrc,
  imageSrc,
}: FeatureCardProps) {
  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden hover-lift">
      {/* Image area */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-accent/50">
        {imageLightSrc || imageDarkSrc ? (
          <>
            <Image
              src={(imageLightSrc || imageDarkSrc)!}
              alt={title || "Feature image"}
              fill
              className="object-cover dark:hidden transition-transform duration-500 group-hover:scale-[1.02]"
              priority={false}
            />
            <Image
              src={(imageDarkSrc || imageLightSrc)!}
              alt={title || "Feature image"}
              fill
              className="object-cover hidden dark:block transition-transform duration-500 group-hover:scale-[1.02]"
              priority={false}
            />
          </>
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={title || "Feature image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority={false}
          />
        ) : null}
        {/* Subtle gradient overlay at bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content area */}
      <div className="p-6">
        <h3 className="text-xl font-serif text-foreground">
          {title}
        </h3>
        {content && (
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        )}
      </div>
    </div>
  );
}
