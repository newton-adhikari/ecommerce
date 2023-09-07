import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import "./Home.css";

const Home = () => {
    const product = {
        name: "Blue T-shirt",
        images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
        price: "$300",
        _id: "3243klj4lifdsf32kl43"
    }
    return(
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

            </div>
        </>
    )
}

export default Home;