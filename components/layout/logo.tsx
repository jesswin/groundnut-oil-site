/** Brand mark and wordmark, used in the header, mobile menu and footer. */
export function Logo({ brand }: { brand: string }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* TODO: replace with your logo */}
      <svg viewBox="0 0 64 64" className="size-8 shrink-0" aria-hidden="true">
        <path
          d="M32 7c10 13 16 22 16 32a16 16 0 0 1-32 0c0-10 6-19 16-32z"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2.5"
        />
        <path
          d="M32 25c5 6.500 7.500 11 7.500 15a7.500 7.500 0 0 1-15 0c0-4 2.500-8.500 7.500-15z"
          fill="var(--gold)"
        />
      </svg>
      <span className="brand-word font-heading text-brown-dark text-[1.35rem] leading-tight font-medium">
        {brand}
      </span>
    </span>
  );
}
