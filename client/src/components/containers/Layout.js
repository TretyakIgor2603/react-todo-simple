import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { checkAuthorized } from "../../store/account/account-actions";
import { getToken } from "../../utils/token";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 30px;
  background-color: rgba(221, 221, 221, 0.03);
`;

const Layout = ({checkAuthorized, children}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      getToken() && (await checkAuthorized());
    }
    fetchData();
    setLoading(false);
  }, [checkAuthorized]);

  return (
    <Main>
      <Row>
        <Col xs={24} sm={{ span: 18, offset: 4 }} xl={{ span: 8, offset: 8 }}>
          {!isLoading && children}
        </Col>
      </Row>
    </Main>
  );
};

export default connect(
  null,
  { checkAuthorized }
)(Layout);
