import Nav from "@components/Nav";
import Provider from "@utils/provider";
import "@styles/globals.css";

export const metadata = {
  title: "Parkade",
  description: "A one stop solution for booking and managing parking spots.",
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