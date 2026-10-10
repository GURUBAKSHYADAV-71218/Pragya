import { BookOpen, Eye, FlaskConical, Home, Leaf, Moon, Mountain, Orbit, Route, Settings, Sprout, TreePine, TrendingUp, User, Wind, type LucideIcon } from "lucide-react";
type Item = { href: string; label: string; icon: LucideIcon };
export const navGroups: { label: string; items: Item[] }[] = [
  { label: "Practice", items: [{ href: "/dashboard", label: "Home", icon: Home }, { href: "/training", label: "Training", icon: Route }, { href: "/exercises", label: "Exercises", icon: Sprout }, { href: "/breathing", label: "Breathing", icon: Wind }, { href: "/silence", label: "Silence", icon: Moon }] },
  { label: "Observe", items: [{ href: "/reflections", label: "Reflections", icon: BookOpen }, { href: "/insights", label: "Insights", icon: Eye }, { href: "/experiments", label: "Experiments", icon: FlaskConical }] },
  { label: "Explore", items: [{ href: "/wisdom", label: "Wisdom", icon: Mountain }, { href: "/recommendations", label: "Recommendations", icon: Leaf }, { href: "/progress", label: "Progress", icon: TrendingUp }, { href: "/mental-landscape", label: "Mental Landscape", icon: TreePine }] },
  { label: "You", items: [{ href: "/profile/mind", label: "Mind Profile", icon: Orbit }, { href: "/profile", label: "Profile", icon: User }, { href: "/settings", label: "Settings", icon: Settings }] },
];
