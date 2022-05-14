import "./styles/review-collection.scss";
import CollectionHeader from "../components/CollectionHeader";
import { useLocation } from "react-router-dom";
import { Card, PublishedCollectionMetaData } from "../helpers/baseTypes";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DUMMY_COLLECTION } from "../helpers/constants";

export interface ReviewState {
    review: { card: Card; isCorrect: boolean }[];
    collectionMetaData: PublishedCollectionMetaData;
}
const ReviewCollection = () => {
    const reviews = (useLocation().state as ReviewState)?.review;
    const collectionMetaData = (useLocation().state as ReviewState)?.collectionMetaData || DUMMY_COLLECTION.collectionMetaData;
    console.log(reviews);
    const rowData = reviews.map((review) => {
        return {
            ...review.card,
            isCorrect: review.isCorrect,
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
            field: "hint",
            headerName: "Hint",
        },
        {
            field: "isCorrect",
            headerName: "Result",
            cellClassName: (params) => {
                return params.value ? "correct" : "incorrect";
            },
        },
    ];

    return (
        <div className="review-page display-padding">
            <CollectionHeader collectionMetaData={collectionMetaData} />
            {rowData.length ? (
                <>
                    <h3>Results</h3>
                    <div style={{ height: 500, width: "100%" }}>
                        <DataGrid rows={[...rowData] || []} rowHeight={100} columns={columns} />
                    </div>
                </>
            ) : null}
            <h3>History</h3>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid rows={[...rowData] || []} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
            </div>
        </div>
    );
};

export default ReviewCollection;
