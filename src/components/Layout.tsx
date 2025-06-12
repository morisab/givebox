import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

const Layout = ({ children, showNavigation = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavigation && <Navigation />}
      <main className={showNavigation ? "pt-16" : ""}>{children}</main>
    </div>
  );
};

export default Layout;
