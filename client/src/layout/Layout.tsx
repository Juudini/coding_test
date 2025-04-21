import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 relative">
        <Sidebar />
        <main className="flex-1 overflow-auto transition-all duration-300 min-h-[calc(100vh-4rem)]">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
