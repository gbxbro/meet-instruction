import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        axios("http://localhost:3000/static/instructons/page_1.html").then(
            (res) => console.log(res),
        );
    }, []);

    return <section className="home">Home</section>;
};

export default Home;
