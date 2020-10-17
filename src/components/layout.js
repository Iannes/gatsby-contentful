import * as React from "react";
import Container from "./container";
import Navigation from "./navigation";
// Styles
import "./base.css";

const Template = ({ children }) => {
  return (
    <Container>
      <Navigation />
      {children}
    </Container>
  );
};

export default Template;
