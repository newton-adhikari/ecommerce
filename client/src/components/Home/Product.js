import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"

const Product = ({product}) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 10 : 15,
        value: 2.5,
        isHalf: true
    }
    return (
        <Link className="productCard" to={product.id}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span> (100 reviews)</span>
            </div>
            <span>{product.price}</span>
        </Link>
    )
}

export default Product;