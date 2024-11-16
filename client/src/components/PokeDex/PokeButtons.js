import React from "react";
import './PokeButtons.scss'

const Buttons = ({ filterItem, setItem, pokeType, pokemons }) => {
  function refreshPage() {
    window.location.reload(false);
  }


  const getButtonClass = (type) => {
    switch (type.toLowerCase()) {
      case "fire":
        return "fire-btn";
      case "grass":
        return "grass-btn";
      case "water":
        return "water-btn";
      default:
        return "default-btn"; 
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        {pokeType.map((val, id) => {
          return (
            <button
              className={`btn text-white p-1 px-2 mx-5 mb-2  btn fw-bold ${getButtonClass(val)}`}
              onClick={() => filterItem(val)}
              key={id}
            >
              {val}
            </button>
          );
        })}
        <button
          className="btn-dark text-white p-1 px-3 mx-5 mb-2 fw-bold btn"
          onClick={() => refreshPage()}
        >
          All
        </button>
      </div>
    </>
  );
};

export default Buttons;
