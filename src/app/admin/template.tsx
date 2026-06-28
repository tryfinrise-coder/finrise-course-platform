// A template re-mounts on every navigation, so wrapping admin page content
// here gives a quick fade/slide-in transition while the AdminShell (in the
// layout) stays persistent.
export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
