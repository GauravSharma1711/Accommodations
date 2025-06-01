import Sidebar from "./Sidebar";


const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen   border-2 bg-amber-50 border-amber-900 ">
      <div className="flex">
        {showSidebar && <Sidebar />}


          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      
    </div>
  );
};
export default Layout;