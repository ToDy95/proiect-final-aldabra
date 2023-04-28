import React from "react";
import "./Card.css"

export default function Card({props}) {


  return (
    
      <div
        className="card"

        id={props._id}
      >
        <img
          src={props.image}
          alt={props.title}
          className="sneaaker-img"
        />
        <h1 className="title" >
          {props.title}
        </h1>
        <div className="scrollDiv">
        <p >
         {props.synopsis}
         </p>
         </div>
        <div className="button-box" >
          <button className="purchase" >
            SEEN
          </button>
        </div>
      </div>
  );
}