import { useEffect, useRef, useState } from "react";

const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;

let scriptInjected = false;

function injectAdSenseScript() {
  if (scriptInjected || !CLIENT || typeof document === "undefined") return;
  if (document.querySelector(`script[src*="adsbygoogle"]`)) {
    scriptInjected = true;
    return;
  }
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
  scriptInjected = true;
}

interface AdSenseBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AdSenseBanner({
  slot,
  format = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
}: AdSenseBannerProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT || !slot) return;
    injectAdSenseScript();

    const timer = setTimeout(() => {
      if (!pushed.current && insRef.current) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          pushed.current = true;
        } catch {}
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [slot]);

  if (!CLIENT || !slot) {
    return (
      <div
        className={`w-full flex items-center justify-center h-[90px] bg-gray-100 dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/10 rounded-xl ${className}`}
      >
        <span className="text-xs text-gray-400 dark:text-white/25 select-none">
          Advertisement
        </span>
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...(style || {}) }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
}

interface AdSenseInterstitialProps {
  slot: string;
  className?: string;
}

export function AdSenseInterstitial({ slot, className = "" }: AdSenseInterstitialProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (!CLIENT || !slot) return;
    injectAdSenseScript();

    const timer = setTimeout(() => {
      if (!pushed.current && insRef.current) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          pushed.current = true;
          setAdLoaded(true);
        } catch {
          setAdLoaded(false);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [slot]);

  if (!CLIENT || !slot) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "250px" }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="rectangle"
        data-full-width-responsive="true"
      />
      {!adLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/20 text-xs">Memuat iklan...</span>
        </div>
      )}
    </div>
  );
}
