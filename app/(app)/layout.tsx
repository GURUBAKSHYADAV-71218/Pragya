import AppNav from "@/components/navigation/AppNav";
import SettingsApplier from "@/components/layout/SettingsApplier";
import ThemeToggle from "@/components/ui/ThemeToggle";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row"><SettingsApplier /><AppNav />
      <div className="relative min-w-0 flex-1">
        <div className="relative z-20 hidden justify-end px-12 pt-5 md:flex"><ThemeToggle /></div>
        {children}
      </div>
    </div>
  );
}
