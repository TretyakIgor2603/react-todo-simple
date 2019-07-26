import React from "react";
import Navigation from "./Navigation";
import Notification from "./UI/Notification";
import { BrowserRouter } from "react-router-dom";
import Layout from "./containers/Layout";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Navigation />
          <Notification />
        </Layout>
      </BrowserRouter>
    );
  }
}
