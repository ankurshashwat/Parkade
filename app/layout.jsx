import Nav from "@components/Nav";
import Provider from "@utils/provider";
import "@styles/globals.css";

export const metadata = {
  title: "Parkade",
  description: "parkade provides a streamlined experience for individuals looking to monetize their parking spaces or find convenient parking solutions.",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;