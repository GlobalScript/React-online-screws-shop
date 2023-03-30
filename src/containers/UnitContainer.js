
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { goodsState } from '../store/dataSlice';
import { hiddenComponent,
          hiddenSort,
          numberCurrentPage,
          setActivePage } from '../store/elementVisibilitySlice';
import { addFirstThunk, deductThunk } from '../store/cartSlice';
import {orderBy} from 'lodash';
import Unit from "../components/product-components/Unit";
import UnitList from "../components/product-components/UnitList";
import Banner from "../components/app-components/Banner";
import Pagination from '../components/product-components/Pagination';

function sortBy(goods, category, selectBy) {
      let categoriesFilter = "";
      if(category) categoriesFilter = goods.filter(unit => unit.category === category);
      else categoriesFilter = goods;
        switch (selectBy) {
          case 'price-desc':
            return orderBy(categoriesFilter, 'price', 'desc');
          case 'price-asc':
            return orderBy(categoriesFilter, 'price', 'asc');
          case 'short-asc':
            return orderBy(categoriesFilter, 'title', 'asc');
          case 'short-desc':
            return orderBy(categoriesFilter, 'title', 'desc');  
          default:
            return categoriesFilter;
        }
  };
function UnitContainer(){
      const {selectUnit, category, selectBy, currentPage} = useSelector(state => state.visibility);
      const {goods, status} = useSelector(goodsState);
      const [items, setItems] = useState([]);
      const dispatch = useDispatch();
useEffect(() => { 
        setItems(sortBy(goods, category, selectBy));
        dispatch(hiddenComponent(true));
        dispatch(hiddenSort(false));
        dispatch(numberCurrentPage(1));
        dispatch(setActivePage(0));
    },[category, status, selectBy]);
  function cartHandler(event){
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains('btn-add')) dispatch(addFirstThunk(target.dataset.cart));
        if(target.classList.contains('btn-del')) dispatch(deductThunk(target.dataset.cart));         
}
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber =>{
    dispatch(numberCurrentPage(pageNumber));
   if(selectUnit === "list") window.scrollTo(0, 250)
  } 
    return <>
                  {status === "resolved" && <Banner />}
              <div className="field-product" onClick={cartHandler}> 
              {selectUnit === "mosaic" && <div className="unit-container">
                  {currentItems.map(item => <Unit key={item.id} {...item} />)}</div>}         
              {selectUnit === "list" && <div className="unit-container">
                  {currentItems.map(item => <UnitList key={item.id} {...item} />)}</div>} 
          <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={items.length}
              paginate={paginate} />
            </div>
            </> 
}
export default UnitContainer;