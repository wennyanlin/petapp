import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import icon from "../icon2.png";
import Api from "../helpers/Api";

const FavouritePets = (props) => {

  const { favouritePets, setFavouritePets, getAllFavouritePets } = props

  
  useEffect(() => {
    

    getAllFavouritePets();
  }, []);

  const deleteFavouritePets = async (id) => {
    let results = await Api.deleteFavourite(id);
    setFavouritePets(results.data);
  }

  return (
    <div className="allgrids">
      {favouritePets.map((e) => (
        <div key={e.id} className="card" style={{ width: "18rem" }}>
          <div>
            {e.photos[0] ? (
              <Link to={"/Featured/" + e.id}>
                <img className="card-img-top" alt="pet" src={e.photos} />
              </Link>
            ) : (
              <Link to={"/Featured/" + e.id}>
                <img className="card-img-top" src={icon} alt="icon" />
              </Link>
            )}
          </div>
          <div className="card-body">
            <h3 className="card-title">{e.name}</h3>
            <h6 className="card-text">{e.breed}</h6>
            <button className="likebtn" onClick={envent => deleteFavouritePets(e.id)} >🧡</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FavouritePets;
