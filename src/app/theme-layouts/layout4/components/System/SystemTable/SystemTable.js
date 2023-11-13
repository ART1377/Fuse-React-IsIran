import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import Pagination from "@mui/material/Pagination";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchBar from "app/theme-layouts/layout4/components/SearchBar/SearchBar";
import DeleteModal from "../../DeleteModal/DeleteModal";
import SystemEditModal from "../SystemEditModal/SystemEditModal";

export default function SystemTable({ data }) {
  const rows = data;

  // Select Row For Operations
  const [selectedRow, setSelectedRow] = useState("");

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // Query Search
  const [systemNameQuery, setSystemNameQuery] = useState("");
  const [systemLatinNameQuery, setSystemLatinNameQuery] = useState("");
  const [systemNumberQuery, setSystemNumberQuery] = useState("");
  const [portNumberQuery, setPortNumberQuery] = useState("");

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Operation Handler
  const deleteIconHandler = (id) => {
    setSelectedRow(id);
    handleDeleteModalOpen();
  };
  const editIconHandler = (id) => {
    setSelectedRow(id);
    handleEditModalOpen();
  };

  // Filter Data Based on Queries
  const filteredDate = rows.filter((item) => {
    return (
      item.systemName
        .trim()
        .toLowerCase()
        .includes(systemNameQuery.trim().toLowerCase()) &&
      item.systemLatinName
        .trim()
        .toLowerCase()
        .includes(systemLatinNameQuery.trim().toLowerCase()) &&
      item.systemNumber
        .trim()
        .toLowerCase()
        .includes(systemNumberQuery.trim().toLowerCase()) &&
      item.portNumber
        .trim()
        .toLowerCase()
        .includes(portNumberQuery.trim().toLowerCase())
    );
  });

  // Slice Data Based on Pagination
  const slicedData = filteredDate.slice(
    page * rowsPerPage - rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                نام سازمان
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                نام لاتین سامانه
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                شماره سامانه
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                شماره پورت
              </TableCell>
              <TableCell sx={{ padding: "16px" }} align="center" />
            </TableRow>

            {/* Search Bar ********* */}
            <TableRow sx={{ backgroundColor: "#F5F6F7" }}>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={systemNameQuery}
                  changeHandler={(e) => setSystemNameQuery(e.target.value)}
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={systemLatinNameQuery}
                  changeHandler={(e) => setSystemLatinNameQuery(e.target.value)}
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={systemNumberQuery}
                  changeHandler={(e) => setSystemNumberQuery(e.target.value)}
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={portNumberQuery}
                  changeHandler={(e) => setPortNumberQuery(e.target.value)}
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              />
            </TableRow>
          </TableHead>

          {/* Table Body ************** */}
          <TableBody>
            {slicedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{ width: 140 }} align="center">
                  {row.systemName}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.systemLatinName}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.systemNumber}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.portNumber}
                </TableCell>

                {/* Operations Cell ******** */}
                <TableCell
                  style={{ width: 140, display: "flex", gap: 16 }}
                  align="center"
                >
                  <Fab
                    onClick={() => editIconHandler(row)}
                    color="primary"
                    size="small"
                    sx={{
                      borderRadius: "8px",
                      boxShadow: "none",
                      width: "32px",
                      height: "32px",
                      minHeight: "32px",
                    }}
                  >
                    <EditIcon />
                  </Fab>
                  <Fab
                    onClick={() => deleteIconHandler(row)}
                    color="secondary"
                    size="small"
                    sx={{
                      borderRadius: "8px",
                      boxShadow: "none",
                      width: "32px",
                      height: "32px",
                      minHeight: "32px",
                    }}
                  >
                    <DeleteOutlineIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination ********* */}
        <Pagination
          count={Math.ceil(rows.length / 5)}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
          dir="ltr"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: "16px",
          }}
        />
      </TableContainer>
      {deleteModalOpen && (
        <DeleteModal
          state={deleteModalOpen}
          selectedRowId={selectedRow}
          onOpen={handleDeleteModalOpen}
          onClose={handleDeleteModalClose}
          category="system"
        />
      )}
      {editModalOpen && (
        <SystemEditModal
          modalState={editModalOpen}
          selectedRow={selectedRow}
          onOpen={handleEditModalOpen}
          onClose={handleEditModalClose}
        />
      )}
    </>
  );
}
