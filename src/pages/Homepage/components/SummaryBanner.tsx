import { Avatar, Paper, Skeleton } from "@mui/material";
import { useFetch } from "../../../helpers/apiHelpers";
import { User } from "../../../helpers/baseTypes";

const SummaryBanner = ({ user }: { user: User }) => {
    const { data, loading } = useFetch("/home/summary");
    const summary = data
        ? [
              {
                  title: "Collections Created",
                  count: data.createdCollections,
              },
              {
                  title: "Learning Collections",
                  count: data.learningCollections,
              },
              {
                  title: "Total Completion Rate",
                  count: data.totalLearnings + "%",
              },
          ]
        : [];
    return (
        <Paper className="summary-banner" variant="outlined" sx={{ borderRadius: "1rem" }}>
            <div className="display-padding banner-container">
                <Avatar sx={{ height: 100, width: 100 }} alt={user.displayName} src={user.photoURL} />
                <div className="summaries-wrapper">
                    <h5>Summary</h5>
                    <div className="summaries">
                        {loading ? (
                            <>
                                {Array.from(Array(3)).map((_t, id) => (
                                    <Skeleton
                                        animation="wave"
                                        key={id}
                                        className="summary-tile"
                                        variant="rectangular"
                                        height={50}
                                        sx={{ flex: 1, borderRadius: "1rem", margin: "0 2rem" }}
                                    />
                                ))}
                            </>
                        ) : data ? (
                            <>
                                {summary.map((card, index) => {
                                    return <SummaryCards {...card} key={card.title + index} />;
                                })}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </Paper>
    );
};

const SummaryCards = (props: { title: string; count: number | string }) => {
    return (
        <div className="summary-tile">
            <h2>{props.count}</h2>
            <h6>{props.title}</h6>
        </div>
    );
};

export default SummaryBanner;
