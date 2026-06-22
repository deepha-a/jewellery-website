import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="gd-app-root">
      <Sidebar />

      <div className="gd-content-area">
        <TopBar />
        <main className="gd-main">{children}</main>
      </div>
    </div>
  );
}