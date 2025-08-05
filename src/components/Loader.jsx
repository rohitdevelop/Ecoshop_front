"use client";

import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
      <p className="text">EcoShop</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #000; /* Optional: Black background for contrast */

  .loader {
    border: 4px solid rgba(0, 128, 0, 0.2); /* Green outer border with opacity */
    border-left-color: #00ff00; /* Bright green spinner */
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin89345 1s linear infinite;
  }

  .text {
    margin-top: 16px;
    color: #00ff00;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
