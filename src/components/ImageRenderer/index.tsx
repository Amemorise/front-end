import React, { useState, useCallback, useEffect } from "react";
import Error from "./image-not-found.png";

interface ImageRendererProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    placeholderImg?: string;
    errorImg?: string;
}

const ImageRenderer = ({ placeholderImg, src, errorImg, alt, ...props }: ImageRendererProps) => {
    const [imgSrc, setSrc] = useState(placeholderImg || src);

    const onLoad: () => void = useCallback(() => {
        setSrc(src);
    }, [src]);

    const onError = useCallback(() => {
        setSrc(errorImg || Error);
    }, [errorImg]);

    useEffect(() => {
        const img = new Image();
        img.src = src as string;
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onError);
        return () => {
            img.removeEventListener("load", onLoad);
            img.removeEventListener("error", onError);
        };
    }, [src, onLoad, onError]);

    return <img loading="lazy" {...props} src={imgSrc} alt={alt || "amemorise"} />;
};

export default ImageRenderer;
