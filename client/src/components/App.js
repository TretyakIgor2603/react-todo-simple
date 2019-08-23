import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";
import Navbar from "./ui/Navbar";
import Navigation from "./Navigation";
import Notification from "./ui/Notification";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Navbar />
          <Navigation />
          <Notification />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
