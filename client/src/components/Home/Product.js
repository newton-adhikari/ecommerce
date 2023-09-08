import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"

const Product = ({product}) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 10 : 15,
        value: product.rating,
        isHalf: true
    }
    return (
        <Link className="productCard" to="">
            <img src="" alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span> ({product.numberOfReviews} reviews)</span>
            </div>
            <span>{product.price}</span>
        </Link>
    )
}

export default Product;