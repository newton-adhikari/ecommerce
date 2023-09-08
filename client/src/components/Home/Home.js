import { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import "./Home.css";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        
        if(error) {
            return alert.error(error);
        }

        dispatch(getProduct());
    }, [dispatch, error]);
    console.log(products);

    return(
        loading
            ? <Loader />
            : (
                <>
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>Find your desired products below</h1>
                        <a href="#container">
                            <button>
                                Scroll
                                <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h1 className="homeHeading">Featured Products</h1>

                    <div className="container" id="container">
                        {products && products.map(p => <Product key={p._id} product={p} />)}
                    </div>
                </>
            )
    )
}

export default Home;