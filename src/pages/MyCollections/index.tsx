import { Stack, Typography } from "@mui/material";
import { usePageTitle } from "../../helpers/helpers";
import LoadingList from "./components/LoadingList";

const Collections = () => {
    usePageTitle("Collections");
    return (
        <div className="display-padding">
            <Stack spacing={3}>
                <div>
                    <Typography variant="h6">Created Collections</Typography>
                    <LoadingList url="/collections/created" />
                </div>
                <div>
                    <Typography variant="h6">Learning Collections</Typography>
                    <LoadingList url="/collections/learning" learningList={true} />
                </div>
            </Stack>
        </div>
    );
};

export default Collections;
