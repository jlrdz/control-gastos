export default function Tooltip({ label, visible, position = "top" }) {
  if (!visible) return null;

  const positions = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`
          absolute ${positions[position]}
          px-2 py-1 rounded-md text-xs whitespace-nowrap shadow-lg
          opacity-0 animate-fadeIn pointer-events-none z-50
          bg-[color-mix(in_oklch,var(--surface),black_30%)]
          text-[var(--text)]
          border border-[color-mix(in_oklch,var(--text),transparent_85%)]
        `}
    >
      {label}
    </div>
  );
}
