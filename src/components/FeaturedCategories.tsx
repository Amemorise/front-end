import { ChevronRight } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import FABButton from "./FABButton";

interface FeaturedCategoriesType {
    title: string;
    count: number;
    link: string;
    image: string;
}
const FeaturedCategories = () => {
    const featured: FeaturedCategoriesType[] = [
        {
            title: "Entertainment",
            count: 4,
            link: "",
            image: "https://weliveentertainment.com/wp-content/uploads/2020/03/theaters.jpg",
        },
        {
            title: "Entertainment",
            count: 4,
            link: "",
            image: "https://weliveentertainment.com/wp-content/uploads/2020/03/theaters.jpg",
        },
        {
            title: "Entertainment",
            count: 4,
            link: "",
            image: "https://weliveentertainment.com/wp-content/uploads/2020/03/theaters.jpg",
        },
    ];
    return (
        <div>
            <h4>Featured Categories</h4>
            <div className="featured-wrapper">
                <div className="featured-category">
                    {featured.length ? (
                        <>
                            {featured.map((feat) => {
                                const { image, title, count } = feat;
                                return (
                                    <div className="featured-item" key={title}>
                                        <img src={image} alt={title} className="featured-image" />
                                        <div className="featured-label">
                                            <h2>{title}</h2>
                                            <h3>{count} Collections</h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {Array.from(Array(3)).map(() => (
                                <Skeleton animation="wave" variant="rectangular" width={40} height={240} />
                            ))}
                        </>
                    )}

                    <FABButton title="View More" url={"/collections"} icon={<ChevronRight />} />
                </div>
            </div>
        </div>
    );
};

export default FeaturedCategories;
