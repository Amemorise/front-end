import { Avatar, Paper } from "@mui/material";

const SummaryBanner = () => {
    const summary = [
        {
            title: "Collections Created",
            count: 3,
        },
        {
            title: "Learning Collections",
            count: 2,
        },
        {
            title: "Total Completion Rate",
            count: "0%",
        },
    ];
    return (
        <Paper className="summary-banner" variant="outlined" sx={{ borderRadius: "1rem" }}>
            <div className="display-padding banner-container">
                <Avatar sx={{ height: 100, width: 100 }} />
                <div className="summaries-wrapper">
                    <h5>Summary</h5>
                    <div className="summaries">
                        {summary.map((card) => {
                            return <SummaryCards {...card} />;
                        })}
                    </div>
                </div>
            </div>
        </Paper>
    );
};

const SummaryCards = (props: { title: string; count: number | string }) => {
    return (
        <div key={props.title} className="summary-tile">
            <h2>{props.count}</h2>
            <h6>{props.title}</h6>
        </div>
    );
};

export default SummaryBanner;
