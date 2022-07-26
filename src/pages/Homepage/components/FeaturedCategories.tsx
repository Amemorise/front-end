import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ImageRenderer from "../../../components/ImageRenderer";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { useFetch } from "../../../helpers/apiHelpers";
import { Categories } from "../../../helpers/Categories";

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
            <Stack direction="row" justifyContent={"space-between"} alignItems="center">
                <Typography variant={"h6"}>Featured Categories</Typography>
                <Link to={"/search?"} style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography variant={"body2"}>SEE ALL</Typography>
                </Link>
            </Stack>
            <div className="featured-category">
                {categories && categories.length ? (
                    <>
                        {categories.map((feat: any, index) => {
                            const { image, name, count } = feat;
                            return (
                                <Link to={`/search?category=${name.toString()}`} key={index + name.toString()}>
                                    <ImageRenderer src={image} alt={name} className="featured-image" />
                                    <div className="featured-label">
                                        <h2>{name.split(": ").pop()}</h2>
                                        <h3>{count} Collections</h3>
                                    </div>
                                </Link>
                            );
                        })}
                    </>
                ) : (
                    <LoadingSkeleton count={3} />
                )}
            </div>
        </div>
    );
};

export default FeaturedCategories;
