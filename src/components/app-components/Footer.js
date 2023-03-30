import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {categories, hiddenSort} from '../../store/elementVisibilitySlice';

function Footer(){
    const dispatch = useDispatch();
    function navigateClick() {
            dispatch(categories(null));
            dispatch(hiddenSort(true));
        }
    return (
        <div className="footer-container">
          <Link to="/home"><h2 onClick={navigateClick}>Petrovich</h2></Link>
          
        <div className="contacts-block">
            <a ><i className="icon-mail"></i></a>
            <a ><i className="icon-facebook"></i></a>
            <a href="https://github.com/GlobalScript" target="_blank"  ><i className="icon-git"></i></a>
            <a ><i className="icon-paper-plane"></i></a>
        </div>
        </div>
    )
}

export default Footer;