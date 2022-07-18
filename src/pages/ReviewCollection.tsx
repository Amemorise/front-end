import CollectionHeader from "../components/CollectionHeader";
import { useLocation } from "react-router-dom";
import { Card, PublishedCollection, Lesson } from "../helpers/baseTypes";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import StartQuizButton from "../components/StartQuizButton";
import CollectionSummary from "../components/CollectionSummary";
import { useParams } from "react-router-dom";
import { useFetch } from "../helpers/apiHelpers";
import { useEffect } from "react";
import { setIsLoading } from "../redux/loading";
import { useDispatch } from "react-redux";
import { getLessonRowData, usePageTitle } from "../helpers/helpers";
import "./styles/review-collection.scss";

export interface ReviewState {
    review?: { card: Card; isCorrect: boolean; userResponse: string }[];
}
const ReviewCollection = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useFetch(`/learning/${params.id}`);
    usePageTitle(data?.collection?.collectionMetaData?.title || "");
    useEffect(() => {
        dispatch(setIsLoading(loading));
    }, [loading, dispatch]);

    const reviews = (useLocation().state as ReviewState)?.review;

    if (loading) {
        return <></>;
    } else if (error) {
        return <></>;
    } else if (data) {
        const { collection, lesson } = data as { collection: PublishedCollection; lesson: Lesson | null };
        const { collectionMetaData, collectionId, cards } = collection;

        const rowData = getLessonRowData(cards, lesson);

        return (
            <div className="review-page display-padding">
                <CollectionHeader collectionId={collectionId} collectionMetaData={collectionMetaData} />
                <Divider />
                <CollectionSummary cards={rowData || []} />
                <StartQuizButton
                    titleText="Restart"
                    collection={{
                        collectionId,
                        collectionMetaData,
                        cards,
                    }}
                />
                <Divider />

                {rowData && rowData.length ? (
                    <TableContainer component={Paper} sx={{ margin: "1rem auto 1rem" }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ th: { padding: "0.5rem" } }}>
                                    <TableCell align="center">Images</TableCell>
                                    <TableCell align="center">Label</TableCell>
                                    {reviews ? <TableCell align="center">Response</TableCell> : null}
                                    <TableCell align="center">Completion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowData.map((card) => {
                                    const { id, photoURL, label, average } = card;
                                    const cardResponse = reviews?.find((review) => review.card.id === id);

                                    return (
                                        <TableRow
                                            key={id}
                                            sx={{
                                                td: { padding: "0.5rem" },
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell align="center">
                                                <img src={photoURL} alt={label} className={"review-table-image"} />
                                            </TableCell>
                                            <TableCell align="center">{label}</TableCell>
                                            {cardResponse ? (
                                                <TableCell
                                                    align="center"
                                                    className={cardResponse.isCorrect ? "correct" : "incorrect"}
                                                >
                                                    {cardResponse.userResponse}
                                                </TableCell>
                                            ) : null}
                                            <TableCell align="center">{(average * 100).toFixed(1) + "%"}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <h6>You haven't attempted this collection yet. Give it a try!</h6>
                )}
            </div>
        );
    } else {
        return <></>;
    }
};

export default ReviewCollection;
