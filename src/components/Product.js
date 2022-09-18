import React from "react";

const Line = (
  <hr
    style={{
      width: "100%",
      color: "floralwhite",
    }}
  />
);
function Product({ data }) {
  const { title, image, subtitle, tags } = data;
  return (
    <div className="product">
      <img alt="product" src={image} className="product-logo" />
      <h2>{title}</h2>
      <p style={{ width: "70%", color: "gray" }}>{subtitle}</p>
      {Line}
      <div className="tags">
        {tags.map((item,index)=>{
            return<div key={index} className="tag">{item}</div>
        })}
      </div>
      {Line}
    </div>
  );
}

export default Product;
