import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countState, addFirstThunk, deductThunk   } from '../../store/cartSlice';
import Slider from "./Slider";

function Single({unit}) {
    const {id, title, price, image, description} = unit;
    const [srcImage, setSrcImage] = useState(image);
    const {active, count, statusCart} = useSelector(countState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
function clickImage(event) {
        const target = event.target.src;
        setSrcImage(target);
    }
function cartHandler(event){
        event.preventDefault();
        const target = event.target;
        if(target.classList.contains('btn-add')) dispatch(addFirstThunk(target.dataset.cart));   
        if(target.classList.contains('btn-del')) dispatch(deductThunk(target.dataset.cart));         
}
    return <>    
        <div className="single-container">
        <div className="single-left-content">
                <div className="single-img">
                    <img src={srcImage} />
                    <div className="cart-status">
                    {active[id] && <div className='status-ok'><h6>{count[id]}</h6></div> }
                </div>
                </div>
                <Slider>
            <div className="item-slider"><img src={image} onClick={clickImage}/></div>
            <div className="item-slider"><img src={image} onClick={clickImage}/></div>
            <div className="item-slider"><img src={image} onClick={clickImage}/></div>
            <div className="item-slider"><img src={image} onClick={clickImage}/></div>
            <div className="item-slider"><img src={image} onClick={clickImage}/></div>
                </Slider>
        </div>
        <div className="single-right-content">
            <div className='single-short'>
            <h2>{title}</h2>
            </div>
            <span className="price">{price}&nbsp;&#x24;</span>
            <h5>Description</h5>
            <div className="single-discription">
            <p>{description}</p>
            </div>
            <button className="single-go-back" onClick={() => navigate(-1)}>Go Back</button>
            {statusCart && <div className="single-cart-bar" onClick={cartHandler}>
                <i className='icon-plus btn-add' data-cart={id} ></i>
                <Link  to="/cart" className='icon-basket'></Link>
                <i className='icon-minus btn-del' data-cart={id}></i>
            </div>}
            {!statusCart && <div className="single-cart-bar"><div className="lds-dual-ring"></div></div>}
        </div>
        </div>
    </>
}

export default Single;