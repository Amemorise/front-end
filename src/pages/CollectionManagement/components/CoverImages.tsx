import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}`,
    };
}

const CoverImages = ({ images }: { images: string[] }) => {
    const itemData = images.map((image, index) => {
        return {
            img: image,
            title: "Cover Image",
            rows: index === 0 ? 2 : undefined,
            cols: index === 0 ? 2 : undefined,
        };
    });

    return (
        <ImageList sx={{ maxWidth: "40rem", margin: "1rem auto 2rem" }} variant="quilted" cols={3} rowHeight={160}>
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default CoverImages;
