import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goodsState } from "../../store/dataSlice";
import { addFirstThunk, deductThunk } from '../../store/cartSlice';
import Unit from "./Unit";
import UnitList from "./UnitList";

function Search(){
    const dispatch = useDispatch();
    const {goods} = useSelector(goodsState);
    const {selectUnit} = useSelector(state => state.visibility);
    const [found, setFound] = useState([]);
function searchFilter(goods, value){
    return goods.filter(elem => {
        return elem.title.toLowerCase().includes(value.toLowerCase());
    });
  }
function change(event) {
    const target = event.target.value;
        setFound(target ? searchFilter(goods, target) : []);
    }
function cartHandler(event){
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains('btn-add')) dispatch(addFirstThunk(target.dataset.cart));   
        if(target.classList.contains('btn-del')) dispatch(deductThunk(target.dataset.cart));                   
    }
    return <>
        <div className="banner-field"><h1>Search</h1></div>
        <div className="search-container">
        <div className="search-input">
            <input onChange={change} />
        </div>
        <div className="cards-found" onClick={cartHandler}>
            {selectUnit === "mosaic" && <div className="unit-container">
                {found.map(item => <Unit key={item.id} {...item} />)}</div>}         
            {selectUnit === "list" && <div className="unit-container">
                {found.map(item => <UnitList key={item.id} {...item} />)}</div>}
        </div>
        </div>
    </>
}

export default Search;