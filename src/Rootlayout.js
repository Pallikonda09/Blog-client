
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Nav from "./components/navbar/Nav";

function RootLayout() {
  return (
    <div>
      <Nav />
      <div style={{ minHeight: "70vh" }}>
        <div className="container">
          {" "}
          <Outlet />
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
