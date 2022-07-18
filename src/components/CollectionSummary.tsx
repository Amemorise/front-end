import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card } from "../helpers/baseTypes";

export interface CollectionSummaryProps {
    cards: Partial<Card>[];
}
const CollectionSummary = (props: CollectionSummaryProps) => {
    const { cards } = props;
    return (
        <TableContainer component={Paper} sx={{ margin: "1rem auto 1rem", maxWidth: "40rem" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ th: { padding: "0.5rem" } }}>
                        <TableCell align="center">Not Started 😵</TableCell>
                        <TableCell align="center">WIP 😐</TableCell>
                        <TableCell align="center">Warming Up🙂</TableCell>
                        <TableCell align="center">Perfected 😄</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ td: { padding: "0.5rem" }, "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="center">{cards.length}</TableCell>
                        <TableCell className="incorrect" align="center">
                            {cards.length}
                        </TableCell>
                        <TableCell className="warning" align="center">
                            {cards.length}
                        </TableCell>
                        <TableCell className="correct" align="center">
                            {cards.length}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CollectionSummary;
