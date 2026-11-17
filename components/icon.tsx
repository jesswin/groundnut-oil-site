import {
  BadgeCheck,
  Clock,
  Cog,
  Droplet,
  Filter,
  FlaskConical,
  Handshake,
  Leaf,
  MapPin,
  Megaphone,
  Package,
  ShieldCheck,
  Sprout,
  Tag,
  Truck,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconKey } from "@/lib/site-config";

const icons: Record<IconKey, React.ComponentType<LucideProps>> = {
  droplet: Droplet,
  leaf: Leaf,
  clock: Clock,
  shield: ShieldCheck,
  sprout: Sprout,
  filter: Filter,
  cog: Cog,
  flask: FlaskConical,
  package: Package,
  badge: BadgeCheck,
  truck: Truck,
  handshake: Handshake,
  tag: Tag,
  users: Users,
  megaphone: Megaphone,
  map: MapPin,
};

/** Decorative icon chosen by the `icon` key used in site-config. */
export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" {...props} />;
}

/* Brand glyphs (lucide-react no longer ships brand icons). */
type SvgProps = React.SVGProps<SVGSVGElement>;
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WhatsAppIcon(props: SvgProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z" />
      <path
        fill="currentColor"
        stroke="none"
        d="M 16.2 13.77 v 1.26 a 0.84 0.84 0 0 1 -0.92 0.84 8.31 8.31 0 0 1 -3.62 -1.29 8.19 8.19 0 0 1 -2.52 -2.52 8.31 8.31 0 0 1 -1.29 -3.64 A 0.84 0.84 0 0 1 8.69 7.5 h 1.26 a 0.84 0.84 0 0 1 0.84 0.72 5.39 5.39 0 0 0 0.29 1.18 0.84 0.84 0 0 1 -0.19 0.89 L 10.36 10.82 a 6.72 6.72 0 0 0 2.52 2.52 l 0.53 -0.53 a 0.84 0.84 0 0 1 0.89 -0.19 5.39 5.39 0 0 0 1.18 0.29 A 0.84 0.84 0 0 1 16.2 13.77z"
      />
    </svg>
  );
}
export function InstagramIcon(props: SvgProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}
export function FacebookIcon(props: SvgProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
    </svg>
  );
}
export function YoutubeIcon(props: SvgProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3V9z" />
    </svg>
  );
}
export function LinkedinIcon(props: SvgProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v5M8 8v.01M12 16v-5M12 13a2 2 0 0 1 4 0v3" />
    </svg>
  );
}
