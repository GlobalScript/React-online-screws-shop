import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { hiddenComponent, hiddenSort} from "../../store/elementVisibilitySlice";

function About() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hiddenComponent(true));
        dispatch(hiddenSort(true));
    },[]);
    return <> 
                <div className="banner-field"><h1>SPA Project</h1></div>
                <div className="about-container">
                <ul>
                    <li>React js</li>
                    <li>Redux Toolkit</li>
                    <li>Axios</li>
                    <li>Sass</li>
                    <li>Lodash</li>
                </ul>
                </div>
            </>
}

export default About;