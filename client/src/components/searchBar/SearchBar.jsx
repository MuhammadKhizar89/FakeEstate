import {useState} from "react";
import "./searchBar.scss";
import {Link} from "react-router-dom";
const types = ["buy", "rent"];
const SearchBar = () => {
    const [query, setquery] = useState({
        type: "buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });
    const switchType = (val) => {
        setquery((prev) => ({...prev, type: val}));
    };
    const handleChange = (e) => {
        setquery((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type, index) => (
                    <button
                        className={query.type === type ? "active" : ""}
                        onClick={() => switchType(type)}
                        key={index}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <form>
                <input type="text" name="city" placeholder="City" onChange={handleChange} />
                <input
                    type="number"
                    name="minPrice"
                    min={0}
                    max={100000}
                    placeholder="Min Price"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={10000000}
                    placeholder="Max Price"
                    onChange={handleChange}
                />
                <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
                    <button>
                        <img src="/search.png" alt="" />
                    </button>
                </Link>
            </form>
        </div>
    );
};
export default SearchBar;
