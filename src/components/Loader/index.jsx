export default function Loader({ loading = false }) {
  if (!loading) return null;

  return (
    <div
      className={`
          absolute inset-0 
          flex items-center justify-center 
          bg-[oklch(var(--background)/0.65)] 
          backdrop-blur-[2px]
          transition-all duration-200
        `}
    >
      <div
        className="
            w-10 h-10 
            border-[3px] border-[oklch(0.3_0.02_250_/_0.2)] 
            border-t-[oklch(0.7_0.18_250)] 
            rounded-full animate-spin
            shadow-[0_0_8px_oklch(var(--primary)/0.3)]
          "
      ></div>
    </div>
  );
}
