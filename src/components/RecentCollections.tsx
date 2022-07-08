import { ChevronRight } from "@mui/icons-material";
import FABButton from "./FABButton";

const RecentCollections = () => {
    return (
        <div>
            <h4>Jump back in!</h4>
            <div className={"cards-list"}>
                {/* <CollectionCard title={"Recent Card"} isPrivate lastAccessedDate={1394104654} percentComplete={80} />
                <CollectionCard title={"Recent Card"} lastAccessedDate={1394104654} percentComplete={80} />
                <CollectionCard title={"Recent Card"} isPrivate lastAccessedDate={1394104654} percentComplete={80} />
                <CollectionCard title={"Recent Card"} isPrivate lastAccessedDate={1394104654} percentComplete={80} /> */}
                <FABButton title="View More" url={"/collections"} icon={<ChevronRight />} />
            </div>
        </div>
    );
};

export default RecentCollections;
