import "./footer.css";
import appStore from "../../../images/Appstore.png"
import playstore from "../../../images/playstore.png"

const footer = () => {
    return (
        <footer>
            <div className="leftFooter">
                <h4>Download our app</h4>
                <p>Avalilabe for both playstore and appstore</p>
                <img src={playstore} alt="Playstore" />
                <img src={appStore}  alt="Appstore" />
            </div>
            <div className="midFooter">
                <h1>Ecommerce</h1>
                <p>Always with you forever <br />Shop with us for high quality products<br />Serving over 50 years</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="#">Linkedin</a>
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>

            </div>
        </footer>
    )
}

export default footer;