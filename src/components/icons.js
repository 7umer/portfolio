/**
 * Curated icon map for content-driven icons.
 *
 * Content JSON stores an icon *name*, so the component needs a lookup. Doing
 * that with `import * as Icons from "lucide-react"` would pull the entire
 * library into the bundle, so only the icons offered in the CMS dropdown are
 * imported here. Keep this list and the `options` in
 * public/admin/config.yml in sync when adding one.
 */
import {
  Building2,
  Code2,
  Gauge,
  Gem,
  Home,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Palette,
  Rocket,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Stethoscope,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

const ICONS = {
  Building2,
  Code2,
  Gauge,
  Gem,
  Home,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Palette,
  Rocket,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Stethoscope,
  Target,
  Wallet,
  Zap,
};

/** Always returns a component — unknown names fall back to a neutral icon. */
export const getIcon = (name) => ICONS[name] || Sparkles;

export default ICONS;
