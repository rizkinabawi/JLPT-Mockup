interface NihonGoLogoProps {
  size?: "sm" | "md" | "lg";
  shape?: "rounded" | "circle";
}

const sizes = {
  sm: { box: "w-8 h-8 rounded-xl", text: "text-lg", brand: "text-sm" },
  md: { box: "w-9 h-9 rounded-xl", text: "text-xl", brand: "text-sm" },
  lg: { box: "w-12 h-12 rounded-2xl", text: "text-2xl", brand: "text-base" },
};

export function LogoMark({ size = "md", shape = "rounded" }: NihonGoLogoProps) {
  const s = sizes[size];
  const radius = shape === "circle" ? "rounded-full" : s.box.split(" ").pop();
  const boxClass = `${s.box.replace(/rounded-\S+/, "")} ${radius}`;

  return (
    <div
      className={`${boxClass} bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/30`}
    >
      <span
        className={`${s.text} font-black text-white leading-none select-none`}
        style={{ fontFamily: "'Noto Sans JP', 'Yu Gothic', sans-serif" }}
      >
        愛
      </span>
    </div>
  );
}

export function LogoFull({ size = "md" }: Pick<NihonGoLogoProps, "size">) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <div className="leading-none">
        <span
          className={`font-extrabold tracking-tight text-gray-900 dark:text-white ${sizes[size].brand}`}
        >
          Nihongo
        </span>
        <span
          className={`font-extrabold tracking-tight text-red-600 dark:text-red-400 ${sizes[size].brand}`}
        >
          Gakkushu
        </span>
      </div>
    </div>
  );
}
