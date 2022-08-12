import React from "react";
import styled from "styled-components";
import './Custom.css';

const PageUl = styled.ul`
  display: flex;
  text-align: center;
  justify-content: center;
  border-radius: 3px;
  margin: 1rem;
`;

const PageLi = styled.li`
  display: inline-block;
  margin: 1rem;
  font-size: 30px;
  font-weight: 1000;
  border-radius: 5px;
  width: 20px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
  }
`;

const C_Pagination = ({ roomsPerPage, totalRooms, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default C_Pagination;