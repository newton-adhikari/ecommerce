import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import WebFont from "webfontloader";

const App = () => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"]
            }
        })
    }, [])
    return(
        <Router>
            <Header />
            <Footer />
        </Router>
    )
}

export default App;