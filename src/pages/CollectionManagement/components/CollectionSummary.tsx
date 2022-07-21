import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardLessonRowData } from "../../../helpers/baseTypes";
import { useEffect } from "react";

export interface CollectionSummaryProps {
    cards: CardLessonRowData[];
}
const CollectionSummary = (props: CollectionSummaryProps) => {
    const { cards } = props;
    const [count, setCount] = React.useState({
        poorCount: 0,
        okayCount: 0,
        greatCount: 0,
    });

    useEffect(() => {
        let poorCount = 0,
            okayCount = 0,
            greatCount = 0;
        cards.forEach((card) => {
            const { average } = card;
            average > 0.66 ? greatCount++ : average > 0.333 ? okayCount++ : poorCount++;
        });
        setCount({
            poorCount,
            okayCount,
            greatCount,
        });
    }, [cards]);

    const { poorCount, okayCount, greatCount } = count;
    return (
        <TableContainer component={Paper} sx={{ margin: "1rem auto 1rem", maxWidth: "40rem" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ th: { padding: "0.5rem" } }}>
                        <TableCell align="center">Cards</TableCell>
                        <TableCell align="center">Needs work 😐</TableCell>
                        <TableCell align="center">Warming Up🙂</TableCell>
                        <TableCell align="center">Perfected 😄</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ td: { padding: "0.5rem" }, "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="center">{cards.length}</TableCell>
                        <TableCell className="incorrect" align="center">
                            {poorCount}
                        </TableCell>
                        <TableCell className="warning" align="center">
                            {okayCount}
                        </TableCell>
                        <TableCell className="correct" align="center">
                            {greatCount}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CollectionSummary;
