import "./styles/review-collection.scss";
import CollectionHeader from "../components/CollectionHeader";
import { useLocation } from "react-router-dom";
import { Card, PublishedCollectionMetaData } from "../helpers/baseTypes";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DUMMY_COLLECTION } from "../helpers/constants";
import { renderProgress } from "../components/GridProgressBar";
import { Divider } from "@mui/material";
import StartQuizButton from "../components/StartQuizButton";
import CollectionSummary from "../components/CollectionSummary";

export interface ReviewState {
    review: { card: Card; isCorrect: boolean; userResponse: string }[];
    collectionMetaData: PublishedCollectionMetaData;
}
const ReviewCollection = () => {
    const reviews = (useLocation().state as ReviewState)?.review;
    const collectionMetaData = (useLocation().state as ReviewState)?.collectionMetaData || DUMMY_COLLECTION.collectionMetaData;
    const rowData = (reviews || []).map((review) => {
        return {
            ...review.card,
            isCorrect: review.isCorrect,
            userResponse: review.userResponse,
            test: Math.random(),
        };
    });
    const columns: GridColDef[] = [
        {
            field: "photoURL",
            headerName: "Images",
            renderCell: (params) => {
                return <img src={params.value} alt={params.value} style={{ width: "100%" }} />;
            },
        },
        {
            field: "label",
            headerName: "Label",
        },
        {
            field: "userResponse",
            headerName: "User Response",
        },
        {
            field: "isCorrect",
            headerName: "Result",
            cellClassName: (params) => {
                return params.value ? "correct" : "incorrect";
            },
            valueFormatter: (params) => {
                return params.value ? "Correct" : "Incorrect";
            },
        },
        {
            field: "test",
            renderCell: renderProgress,
            headerName: "test",
        },
    ];

    return (
        <div className="review-page display-padding">
            <CollectionHeader collectionMetaData={collectionMetaData} />
            <Divider />
            <CollectionSummary cards={DUMMY_COLLECTION.cards} />
            <StartQuizButton
                titleText="Restart"
                collection={{
                    collectionMetaData,
                    cards: (reviews || []).map((review) => {
                        return { ...review.card };
                    }),
                }}
            />
            <Divider />
            {rowData.length ? (
                <div>
                    <h3>Results</h3>
                    <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid autoHeight rows={[...rowData] || []} rowHeight={100} columns={columns} hideFooter />
                        </div>
                    </div>
                </div>
            ) : null}
            <h3>History</h3>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid rows={[...rowData] || []} autoHeight columns={columns} pageSize={100} rowHeight={100} rowsPerPageOptions={[]} disableSelectionOnClick />
            </div>
        </div>
    );
};

export default ReviewCollection;
