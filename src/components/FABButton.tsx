import { Fab, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

interface FABButtonProps {
    title: string;
    icon?: JSX.Element;
    url?: string;
    className?: string;
    onClick?: () => void;
}
const FABButton = ({ url, title, icon, className, onClick }: FABButtonProps) => {
    const button = (
        <Tooltip title={title}>
            <Fab color={"primary"} aria-label={title} onClick={onClick}>
                {icon}
            </Fab>
        </Tooltip>
    );
    return url ? (
        <Link to={url} className={className}>
            {button}
        </Link>
    ) : (
        button
    );
};

export default FABButton;
