import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, Link} from 'react-router-dom';
import { unitProps } from '../../store/dataSlice';

function Unit(props){
    const dispatch = useDispatch();
    const {id, title, price, image} = props;
    const navigate = useNavigate();
    const {active, count, statusCart} = useSelector(state => state.countGoods);
function clickUnit() {
    dispatch(unitProps(props));
    navigate('../single', {replace: false});
}
    return (
        <div className="card-container">
        <div className="product-item">
            <div className="image-field">
                <img className="card-img" src={image} alt="image" onClick={clickUnit}/>
            <div className="cart-status">
                {active[id] && <div className='status-ok'><h6>{count[id]}</h6></div>}
            </div>
            {statusCart && <div className="cart-bar">
            <i className='icon-plus btn-add' data-cart={id} ></i>
            <Link  to="/cart" className='icon-basket'></Link>
            <i className='icon-minus btn-del' data-cart={id}></i>
        </div> }
        {!statusCart && <div className="cart-bar"><div className="lds-dual-ring"></div></div>}
        </div>
        <div className="product-short">
            <h6 onClick={clickUnit}>{title}</h6>
        </div>
            <span className="price">{price}&nbsp;&#x24;</span>	
      </div>
      </div>
    )
}

export default Unit;