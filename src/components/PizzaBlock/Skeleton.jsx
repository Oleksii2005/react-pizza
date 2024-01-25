import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="139" cy="125" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="302" rx="10" ry="10" width="280" height="95" />
    <rect x="1" y="410" rx="10" ry="10" width="105" height="30" />
    <rect x="126" y="409" rx="10" ry="10" width="154" height="30" />
  </ContentLoader>
);
