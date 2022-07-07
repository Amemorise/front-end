import { ChevronRight } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetchCallBack from "../helpers/apiHelpers";
import { Categories } from "../helpers/Categories";
import { setError, clearError } from "../redux/error";
import { setIsLoading } from "../redux/loading";
import FABButton from "./FABButton";

const FeaturedCategories = () => {
    const fetchData = useFetchCallBack();
    const dispatch = useDispatch();

    const { data, error } = fetchData(`/home/featuredCategories`);

    useEffect(() => {
        dispatch(error ? setError({ message: "", error: "" }) : clearError());
    }, [error, dispatch]);

    const categories: any[] =
        data &&
        data.length &&
        data.map((cat: any) => {
            return {
                ...Categories.find((category) => {
                    return category.name === cat._id;
                }),
                count: cat.count,
            };
        });

    return (
        <div>
            <h4>Featured Categories</h4>
            <div className="featured-wrapper">
                <div className="featured-category">
                    {categories && categories.length ? (
                        <>
                            {categories.map((feat: any) => {
                                const { image, name, count } = feat;
                                return (
                                    <div className="featured-item" key={name}>
                                        <img src={image} alt={name} className="featured-image" />
                                        <div className="featured-label">
                                            <h2>{name}</h2>
                                            <h3>{count} Collections</h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {Array.from(Array(3)).map((_t, id) => (
                                <Skeleton animation="wave" key={id} variant="rectangular" width={40} height={240} sx={{ flex: 1, borderRadius: "1rem" }} />
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
