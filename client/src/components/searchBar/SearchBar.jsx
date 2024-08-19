import {useState} from "react";
import "./searchBar.scss";
const types = ["Buy", "Rent"];
const SearchBar = () => {
    const [query, setquery] = useState({
        type: "Buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });
    const switchType = (val) => {
        setquery((prev) => ({...prev, type: val}));
    };
    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type, index) => (
                    <button className={query.type === type ? "active" : ""} onClick={() => switchType(type)} key={index}>
                        {type}
                    </button>
                ))}
            </div>
            <form>
                <input type="text" name="location" placeholder="City Location..." />
                <input type="number" name="minPrice" min={0} max={100000} placeholder="Min Price" />
                <input type="number" name="maxPrice" min={0} max={10000000} placeholder="Max Price" />
                <button>
                    <img src="/search.png" alt="" />
                </button>
            </form>
        </div>
    );
};
export default SearchBar;
