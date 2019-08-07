import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
    background-color: #dbeeff;
    transition: border-color 0.25s ease;
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

const Navbar = ({ auth }) => {
  return (
    <Nav>
      <li>
        <NavLink to="/" exact={true}>
          Tasks
        </NavLink>
      </li>
      {auth.isAuthenticated ? (
        <>
          <li>
            <NavLink to="/profile" exact={false}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" exact={false}>
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <>
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
        </>
      )}
    </Nav>
  );
};

export default Navbar;
