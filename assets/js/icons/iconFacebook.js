import { Icon } from "@wordpress/components";
import React from "react";

const iconFacebook = ({ fill = "currentColor", className = "", ...props }) => (
  <Icon
    icon={() => (
      <svg
        width="18"
        height="32"
        viewBox="0 0 18 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.4375 18H11.75V32H5.5V18H0.375V12.25H5.5V7.8125C5.5 2.8125 8.5 0 13.0625 0C15.25 0 17.5625 0.4375 17.5625 0.4375V5.375H15C12.5 5.375 11.75 6.875 11.75 8.5V12.25H17.3125L16.4375 18Z"
          fill={fill}
        />
      </svg>
    )}
  />
);

export default iconFacebook;
