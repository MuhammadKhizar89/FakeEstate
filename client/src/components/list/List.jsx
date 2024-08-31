import "./list.scss";
import Card from "../card/Card";

function List({listData}) {
    console.log(listData);
    return (
        <div className="list">
            {listData?.map((item) => (
                <Card  item={item} key={item.id} />
            ))}
        </div>
    );
}

export default List;
