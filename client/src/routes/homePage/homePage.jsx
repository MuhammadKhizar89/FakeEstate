import { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
function HomePage() {
    const [experience, setExperience] = useState(0);
    const [awards, setAwards] = useState(0);
    const [propertyReady, setPropertyReady] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const increment = 10; // milliseconds between each step
        const totalSteps = duration / increment;

        const countToTarget = (setTarget, targetValue) => {
            let currentStep = 0;
            const stepValue = targetValue / totalSteps;

            const counter = setInterval(() => {
                currentStep++;
                setTarget(prev => {
                    const newValue = prev + stepValue;
                    return newValue >= targetValue ? targetValue : newValue;
                });

                if (currentStep >= totalSteps) {
                    clearInterval(counter);
                }
            }, increment);
        };

        countToTarget(setExperience, 16);
        countToTarget(setAwards, 200);
        countToTarget(setPropertyReady, 16);

    }, []);

    return (
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Find Real Estate & Get your Dream Place</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis ea, quisquam tempora eum
                        nobis numquam ipsum perferendis, dolor labore non voluptatibus tenetur commodi neque ullam ipsa
                        modi dolorum. Tempora
                    </p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>{Math.round(experience)}+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>{Math.round(awards)}</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>{Math.round(propertyReady)}+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imageContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
}

export default HomePage;
