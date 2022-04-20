import React, { useState } from "react";
import styled, { css } from "styled-components";
//isFilled, isOutline, isBig, onClick,

const ButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem var(--margin-out);
  border-radius: 5rem;
  border-style: none;
  padding: 0.5rem 1rem;
  height: var(--height);
  font-size: var(--fontSize);
`;
const SIZES = {
  small: {
    "--fontSize": "1rem",
    "--height": "var(--size-btn)",
  },

  big: {
    "--fontSize": "var(--size-btn)",
    "--height": "var(--size-title)",
  },
};

const FillButton = styled(ButtonBase)`
  background-color: var(--primary);
  color: var(--bg-0);
`;
const OutlineButton = styled(ButtonBase)`
  background-color: var(--bg-0);
  border: 1px var(--primary) solid;
  color: var(--primary);
`;

const Button = ({ variant, size, children }) => {
  const styles = SIZES[size];
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  } else {
    throw new Error(`Unrecognized Button variant: ${variant}`);
  }

  return <Component style={styles}>{children}</Component>;
};

export default Button;
