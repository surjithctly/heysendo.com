"use client";

import React from "react";

type SliderProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100000,
  step = 500,
  suffix = "",
}: SliderProps) {
  const id = React.useId();
  const [dragging, setDragging] = React.useState(false);
  const percent = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  React.useEffect(() => {
    if (!dragging) return;
    const stop = () => setDragging(false);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    window.addEventListener("pointerup", stop);
    return () => {
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
      window.removeEventListener("pointerup", stop);
    };
  }, [dragging]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <div className="text-sm font-medium text-foreground tabular-nums">
          {value.toLocaleString()} {suffix}
        </div>
      </div>
      <div className="relative">
        <div className="h-2 bg-accent rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
          onPointerDown={() => setDragging(true)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
          aria-valuetext={`${value.toLocaleString()} ${suffix}`}
        />
        {dragging && (
          <div
            className="pointer-events-none absolute -top-10 -translate-x-1/2"
            style={{ left: `${percent}%` }}
          >
            <div className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background tabular-nums shadow-lg whitespace-nowrap">
              {value.toLocaleString()} {suffix}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PricingCalculator() {
  const MARKETING_RATE = 0.001;
  const TRANSACTIONAL_RATE = 0.0004;
  const MINIMUM_SPEND = 10;

  const [marketing, setMarketing] = React.useState<number>(5000);
  const [transactional, setTransactional] = React.useState<number>(12500);

  const marketingCost = marketing * MARKETING_RATE;
  const transactionalCost = transactional * TRANSACTIONAL_RATE;
  const subtotal = marketingCost + transactionalCost;
  const totalDue = Math.max(subtotal, MINIMUM_SPEND);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
      <div className="text-center mb-8">
        <h3 className="text-xl font-serif text-foreground">Pricing Calculator</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Drag the sliders to estimate your monthly cost
        </p>
      </div>

      <div className="space-y-8 max-w-xl mx-auto">
        <Slider
          label="Marketing emails / month"
          value={marketing}
          onChange={setMarketing}
          min={0}
          max={3000000}
          step={500}
          suffix="emails"
        />
        <Slider
          label="Transactional emails / month"
          value={transactional}
          onChange={setTransactional}
          min={0}
          max={3000000}
          step={500}
          suffix="emails"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-accent p-4">
          <div className="text-xs text-muted-foreground mb-1">Marketing</div>
          <div className="text-2xl font-serif text-foreground">
            ${marketingCost.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            @ ${MARKETING_RATE.toFixed(4)} each
          </div>
        </div>
        <div className="rounded-xl bg-accent p-4">
          <div className="text-xs text-muted-foreground mb-1">Transactional</div>
          <div className="text-2xl font-serif text-foreground">
            ${transactionalCost.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            @ ${TRANSACTIONAL_RATE.toFixed(4)} each
          </div>
        </div>
        <div className="rounded-xl bg-primary p-4 text-primary-foreground">
          <div className="text-xs opacity-70 mb-1">Estimated Total</div>
          <div className="text-3xl font-serif">
            ${totalDue.toFixed(2)}
          </div>
          <div className="text-xs opacity-70 mt-1">
            {subtotal < MINIMUM_SPEND ? "Minimum $10 applies" : "per month"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCalculator;
