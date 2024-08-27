import React, {Suspense} from "react";
import "./listPage.scss";
import {listData} from "../../lib/dummydata";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import {Await, useLoaderData} from "react-router-dom";

const ListPage = () => {
    const posts = useLoaderData();
    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={posts.postResponse} errorElement={<div>Error Loading Posts!</div>}>
                            {(postResponse) => {
                                return postResponse.data.map((item) => <Card key={item.id} item={item} />);
                            }}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<div>Loading...</div>}>
                    <Await resolve={posts.postResponse} errorElement={<div>Error Loading Posts!</div>}>
                        {(postResponse) => <Map items={postResponse.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
};

export default ListPage;
