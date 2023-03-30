import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countState, inputValueThunk } from '../../store/cartSlice';
import { unitProps} from '../../store/dataSlice';

function Cart({goods, count}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {subPrice, totalPrice, statusCart} = useSelector(countState);
function change(event, item){
    const inpVal = event.target.value;
        if(inpVal >= 0 || inpVal == ""){
            dispatch(inputValueThunk({inpVal: +inpVal, product_id: item}));
        }
    }
function clickImageUnit(itemID) {
      dispatch(unitProps(goods[itemID]));
      navigate('../single', {replace: false});
  }
    return <>
    <div className='cart-banner-field'>
    <div className="banner-field">
      {!statusCart && <div className=""><div className="lds-dual-ring"></div></div>}
      {statusCart && <h1>Cart</h1>}</div>
      </div>
<table className="cart-table">
                  <thead>
                    <tr className="head-team">
                      <th className="product-remove">Remove</th>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                      {Object.keys(count).map(item => (
                    <tr key={item}>
                      <td>
                      <i className='icon-cancel btn-clear' data-cart={goods[item]?.id}></i>
                      </td>
                      <td className="product-img">
                        <img src={goods[item]?.image} alt="Image-goods-cart" onClick={() => clickImageUnit(item)} />
                      </td>
                      <td className="product-name">
                        <h4 className="title" onClick={() => clickImageUnit(item)}>{goods[item]?.title}</h4>
                      </td>
                      <td className="product-price"><span>{goods[item]?.price}&nbsp;&#8372;</span></td>
                      <td className="product-quantity">
                       <div className="quantity-field">
                        <i className='icon-plus btn-add' data-cart={goods[item]?.id}></i>
                        <input type="number"
                          value={count[item]}
                          onChange={event => change(event, item)}
                          />
                          <i className='icon-minus btn-del' data-cart={goods[item]?.id}></i>
                        </div>
                      </td>
                      <td className="product-subtotal"><span>{subPrice[item]}&nbsp;&#8372;</span></td>
                    </tr>
                    ))}
                  </tbody>
                </table>
                <div className="product-count">
                    <h5>Total quantity</h5>
                    <h5>{Object.keys(count).reduce((previous, item) => {
                          previous =  previous + count[item];
                          return previous;
                        }, 0) }
                    </h5>
                </div>
                <div className="product-total">
                    <h5>Total price</h5>
                    <h5>{totalPrice}&nbsp;&#8372;</h5>
                </div>
                <div className="checkout-page">
                <a onClick={() => navigate(-1)}>Go Back</a>
                <Link to="buy" >Order</Link>
                </div> 
          </>
}

export default Cart;