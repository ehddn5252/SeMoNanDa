import React from "react";
import styled from "styled-components";

const Nav = styled.nav`

  position : fixed;
  margin : 0 auto;
  left : 50%;
  transform: translate(-50%, 0);
  bottom : 7%;
`;
const Button = styled.button`
border: none;
border-radius: 8px;
padding: 8px;
margin: 0;
background: lightgrey;
color: white;
font-size: 1rem;

&:hover {
  background: black;
  cursor: pointer;
  transform: translateY(-2px);
}

&[disabled] {
  background: lightgrey;
  cursor: revert;
  transform: revert;
}

&[aria-current] {
  background: green;
  font-weight: bold;
  cursor: revert;
  transform: revert;
}
`;



function UserPagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
    </Nav>
  );
};

export default UserPagination;