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
import ActionEditModal from "../ActionEditModal/ActionEditModal";

const ActionTable = ({ data }) => {
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
  const [organizationNameQuery, setOrganizationNameQuery] = useState("");
  const [systemNameQuery, setSystemNameQuery] = useState("");
  const [operatingSystemAddressQuery, setOperatingSystemAddressQuery] =
    useState("");
  const [operatingSystemPortQuery, setOperatingSystemPortQuery] = useState("");
  const [mainSystemAddressQuery, setMainSystemAddressQuery] = useState("");
  const [mainSystemPortQuery, setMainSystemPortQuery] = useState("");
  const [situationQuery, setSituationQuery] = useState("");

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
      item.organizationName
        .trim()
        .toLowerCase()
        .includes(organizationNameQuery.trim().toLowerCase()) &&
      item.systemName
        .trim()
        .toLowerCase()
        .includes(systemNameQuery.trim().toLowerCase()) &&
      item.operatingSystemAddress
        .trim()
        .toLowerCase()
        .includes(operatingSystemAddressQuery.trim().toLowerCase()) &&
      item.operatingSystemPort
        .trim()
        .toLowerCase()
        .includes(operatingSystemPortQuery.trim().toLowerCase()) &&
      item.mainSystemAddress
        .trim()
        .toLowerCase()
        .includes(mainSystemAddressQuery.trim().toLowerCase()) &&
      item.mainSystemPort
        .trim()
        .toLowerCase()
        .includes(mainSystemPortQuery.trim().toLowerCase()) &&
      item.situation
        .trim()
        .toLowerCase()
        .includes(situationQuery.trim().toLowerCase())
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
                نام سامانه
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                آدرس عامل
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                پورت عامل
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                آدرس سامانه اصلی
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                پورت سامانه اصلی
              </TableCell>
              <TableCell
                sx={{ padding: "16px", fontWeight: "bold" }}
                align="center"
              >
                وضعیت
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
                  value={organizationNameQuery}
                  changeHandler={(e) =>
                    setOrganizationNameQuery(e.target.value)
                  }
                />
              </TableCell>
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
                  value={operatingSystemAddressQuery}
                  changeHandler={(e) =>
                    setOperatingSystemAddressQuery(e.target.value)
                  }
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={operatingSystemPortQuery}
                  changeHandler={(e) =>
                    setOperatingSystemPortQuery(e.target.value)
                  }
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={mainSystemAddressQuery}
                  changeHandler={(e) =>
                    setMainSystemAddressQuery(e.target.value)
                  }
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={mainSystemPortQuery}
                  changeHandler={(e) => setMainSystemPortQuery(e.target.value)}
                />
              </TableCell>
              <TableCell
                style={{ width: 140 }}
                align="center"
                sx={{ position: "relative" }}
              >
                <SearchBar
                  value={situationQuery}
                  changeHandler={(e) => setSituationQuery(e.target.value)}
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
                  {row.organizationName}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.systemName}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.operatingSystemAddress}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.operatingSystemPort}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.mainSystemAddress}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.mainSystemPort}
                </TableCell>
                <TableCell style={{ width: 140 }} align="center">
                  {row.situation}
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
          category="action"
        />
      )}
      {editModalOpen && (
        <ActionEditModal
          modalState={editModalOpen}
          selectedRow={selectedRow}
          onOpen={handleEditModalOpen}
          onClose={handleEditModalClose}
        />
      )}
    </>
  );
};

export default ActionTable;
