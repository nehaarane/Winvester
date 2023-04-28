import React from "react";

const SemiCircle = ({ percentage }) => {
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <svg width="261" height="265" viewBox="0 0 261 265" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M259.631 134.829C259.522 100.448 245.762 67.201 221.378 42.4027C196.994 17.6044 163.984 3.28587 129.61 2.59708C95.2351 1.90829 62.3117 14.9056 38.0825 38.7299C13.8532 62.5541 0.302714 95.2537 0.41197 129.635L44.4793 130.518C44.4071 107.826 53.3505 86.2446 69.3418 70.5206C85.3331 54.7966 107.063 46.2184 129.75 46.673C152.437 47.1276 174.224 56.5778 190.317 72.9447C206.41 89.3116 215.492 111.254 215.564 133.946L259.631 134.829Z"
        fill="#2B2B36"
        
      />
      <path
        d="M221.378 42.4027C203.194 23.9097 180.061 11.1004 154.903 5.59464C129.745 0.088862 103.693 2.13389 80.0415 11.4711C56.3897 20.8083 36.2002 37.0184 22.0263 58.0514C7.85231 79.0844 0.330487 103.996 0.411971 129.635L44.4793 130.518C44.4255 113.596 49.3899 97.1546 58.7447 83.2728C68.0995 69.391 81.4245 58.6924 97.0348 52.5298C112.645 46.3673 129.839 45.0176 146.443 48.6514C163.048 52.2852 178.316 60.7393 190.317 72.9447L221.378 42.4027Z"
        fill="#FCED2F"
        style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
      />
      <line
        x1="177.533"
        y1="82.3445"
        x2="226.886"
        y2="33.8159"
        stroke="#FCED2F"
        strokeWidth="4.4702"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SemiCircle;
