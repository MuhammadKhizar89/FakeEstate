import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
function homePage() {
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
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>16+</h1>
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

export default homePage;
