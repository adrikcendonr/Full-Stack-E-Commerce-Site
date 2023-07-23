import React from "react";

const Card = ({ title, value, bgColor }) => {
  return (
    <div className={`p-4 rounded-md shadow ${bgColor}`}>
      <div className="text-white text-sm font-semibold mb-2">{title}</div>
      <div className="text-white text-2xl font-bold">{value}</div>
    </div>
  );
};

export default Card;
