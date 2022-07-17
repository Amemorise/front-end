import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetch } from "../helpers/apiHelpers";
import { Categories } from "../helpers/Categories";

interface ICategory {
    name: string;
    image: string;
    attr: {
        userProfile: string;
        user: string;
        unsplashLink: string;
    };
    count?: number;
}
const FeaturedCategories = () => {
    // const dispatch = useDispatch();

    const { data } = useFetch(`/home/featuredCategories`);

    const categories: ICategory[] =
        data &&
        (data as ICategory[]).map((cat) => {
            const foundCat = (Categories as ICategory[]).find((category) => {
                return category.name === cat.name;
            })!;
            return {
                ...foundCat,
                count: cat.count,
            };
        });
    return (
        <div>
            <h4>Featured Categories</h4>
            <div className="featured-category">
                {categories && categories.length ? (
                    <>
                        {categories.map((feat: any, index) => {
                            const { image, name, count } = feat;
                            return (
                                <Link to={`/search?category=${name.toString()}`} key={index + name.toString()}>
                                    <img src={image} alt={name} className="featured-image" />
                                    <div className="featured-label">
                                        <h2>{name.split(": ").pop()}</h2>
                                        <h3>{count} Collections</h3>
                                    </div>
                                </Link>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {Array.from(Array(3)).map((_t, id) => (
                            <Skeleton
                                animation="wave"
                                key={id}
                                variant="rectangular"
                                width={40}
                                height={240}
                                sx={{ flex: 1, borderRadius: "1rem" }}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default FeaturedCategories;
