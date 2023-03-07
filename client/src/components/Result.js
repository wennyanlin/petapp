import React, { useState } from "react";
import icon from "../icon2.png";
import { Link } from "react-router-dom";
import "./Result.css";
import Api from "../helpers/Api";

export default function Result(props) {
  const [featProject, setFeatured] = useState({});
  const { favouritePets, getAllFavouritePets } = props;

  function showPet(id) {
    // once clicked on picture of the dog
    //it shows Featured page with more details
    let featProj = props.results.find((o) => o.id === id);
    setFeatured(featProj);
  }

  const addFavourite = async (id, name, breed, photos) => {
    if (!favouritePets.includes((pet) => pet.id === id)) {
      let results = await Api.storeFavourite(id, name, breed, photos);
      getAllFavouritePets();
    }
  };

  return (
    <div className="resultsall">
      <h3 className="avil">Available furbabes</h3>
      <div className="result">
        {props.results.length && (
          <div className="allgrids">
            {props.results.map((e) => (
              <div key={e.id} className="card" style={{ width: "18rem" }}>
                <div>
                  {e.photos[0] ? (
                    <Link to={"/Featured/" + e.id}>
                      <img
                        className="card-img-top"
                        alt="pet"
                        src={e.photos[0] && e.photos[0].large}
                      />
                    </Link>
                  ) : (
                    <Link to={"/Featured/" + e.id}>
                      <img className="card-img-top" src={icon} alt="icon" />
                    </Link>
                  )}
                </div>
                <div className="card-body">
                  <h3 className="card-title">{e.name}</h3>
                  <h6 className="card-text">{e.breeds.primary}</h6>
                  {props.user ? (
                    <button
                      className="likebtn"
                      onClick={(event) =>
                        addFavourite(
                          e.id,
                          e.name,
                          e.breeds.primary,
                          e.photos[0].large
                        )
                      }
                    >
                      🤍
                    </button>
                  ) : (
                    <Link to={"/Register"} className="likebtn">
                      🤍
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
