import {
    FacebookIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon,
    FacebookShareButton,
    TumblrShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

const SocialMediaShare = ({ url }: { url: string }) => {
    const commonIconConfig = {
        size: 32,
        round: true,
    };
    return (
        <>
        <span className="social-media-component" style={{ display: "flex" }}>
            <RedditShareButton url={url}>
                <RedditIcon {...commonIconConfig} />
            </RedditShareButton>
            <WhatsappShareButton url={url}>
                <WhatsappIcon {...commonIconConfig} />
            </WhatsappShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon {...commonIconConfig} />
            </TelegramShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon {...commonIconConfig} />
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon {...commonIconConfig} />
            </LinkedinShareButton>
            <FacebookShareButton url={url}>
                <FacebookIcon {...commonIconConfig} />
            </FacebookShareButton>
            <TumblrShareButton url={url}>
                <TumblrIcon {...commonIconConfig} />
            </TumblrShareButton>
        </span>
        </>
    );
};

export default SocialMediaShare;
