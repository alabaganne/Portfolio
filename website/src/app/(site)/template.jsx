// Templates remount on every navigation, so each page fades in like a fresh load.
export default function SiteTemplate({ children }) {
  return <div className="motion-safe:animate-page-in">{children}</div>;
}
