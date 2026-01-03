"use client";

export function FeatureCardPlain({
  title,
  content,
}: {
  title?: string;
  content?: string;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 hover-lift h-full flex flex-col">
      <h3 className="text-xl font-serif text-foreground">
        {title}
      </h3>
      {content && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {content}
        </p>
      )}
    </div>
  );
}
