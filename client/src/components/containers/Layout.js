import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 30px;
  background-color: rgba(221, 221, 221, 0.03);
`;

const Layout = (props) => {
  return (
    <Main>
      <Row>
        <Col xs={24} sm={{ span: 18, offset: 4 }} xl={{ span: 8, offset: 8 }}>
          {props.children}
        </Col>
      </Row>
    </Main>
  );
};

export default Layout;
