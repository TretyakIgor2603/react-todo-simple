import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Row, Col } from "antd";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f1f1f1;
  padding: 30px;
`;

const Nav = styled.ul`
  display: flex;
  align-items: flex-start;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
  li {
    display: inline-block;
    text-align: center;
		flex: 1;
		border-right: 1px solid #ddd;
		transition: border-color .25s ease;
    &:last-child {
			margin-right: 0;
			border-right: none;
    }
		&:hover {
			border-color: #fff;
		}
    a {
      display: block;
      padding: 5px 10px;
      transition: 0.25s ease;
      &:hover,
      &.active {
        color: #fff;
        background-color: #1890ff;
      }
    }
  }
`;

const Layout = (props) => {
  return (
    <Main>
      <Row>
        <Col xs={24} sm={{ span: 18, offset: 4 }} xl={{ span: 8, offset: 8 }}>
          <Nav>
            <li>
              <NavLink to="/" exact={true}>
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" exact={false}>
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" exact={false}>
                Login
              </NavLink>
            </li>
          </Nav>
          {props.children}
        </Col>
      </Row>
    </Main>
  );
};

export default Layout;
