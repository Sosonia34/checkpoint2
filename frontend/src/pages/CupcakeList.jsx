import Cupcake from "@components/Cupcake";
import {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

  function CupcakeList() {
  // Step 1: get all cupcakes
  const [cupcake, setCupcake] =useState([]);
  const [accessory, setAccessory] = useState ([]);
  const [accessoryFilter, setAccessoryFilter] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:4000/cupcakes")
    .then(response =>response.data)
    .then(data => setCupcake(data))
  },[]);

  useEffect(() => {
    axios
    .get("http://localhost:4000/accessories")
    .then(response =>response.data)
    .then(data => setAccessory(data))
  },[]);
  // Step 3: get all accessories

  const handleAccessoryFilter = () => {
    setAccessoryFilter (!accessoryFilter);
  };
    return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{""}

          <select id="cupcake-select" onChange={(e)=>setAccessoryFilter(e.target.value)}>
            <option value="">---</option>
            <option value="1">Cherry</option>
            <option value="2">Donut</option>
            <option value="3">Chocolate</option>
            <option value="4">Wild</option>
            <option value="5">Christmas Candy</option>
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {
        cupcake && cupcake
        .filter((cupcake)=> !accessoryFilter || cupcake.accessory_id === accessoryFilter)
        .map(cupcake => (
        <li className="cupcake-item" key={cupcake.id}>
           <Link to={`/cupcake/${cupcake.id}`}>
          <Cupcake key={cupcake.id} cupcake ={cupcake} />
          </Link>
        </li>
        ))
  }
      </ul>
    </>
  );
}
export default CupcakeList;
