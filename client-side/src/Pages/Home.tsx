import { Grid, Typography, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAstrologersAsync } from "../redux/astrologersSlice";
import { RootState, AppDispatch } from "../redux/store";
// import AstrologerCard from "../Components/AstrologerCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Astrologer } from "../redux/astrologersSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const astrologers = useSelector((state: RootState) => state.astrologers.list);
  const loading = useSelector((state: RootState) => state.astrologers.loading);
  const error = useSelector((state: RootState) => state.astrologers.error);

  useEffect(() => {
    dispatch(fetchAstrologersAsync());
  }, [dispatch]);

  const handleEdit = (astrologer: Astrologer) => {
    navigate(`/edit/${astrologer._id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

    // // Function to generate unique IDs for rows
    // const generateUniqueIds = (data: Astrologer[]): Astrologer[] => {
    //   return data.map((astrologer) => ({
    //     ...astrologer,
    //     id: '_' + Math.random().toString(36).substr(2, 9),
    //   }));
    // };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns: GridColDef[] = [
    {
      field: "profileImageUrl",
      headerName: "Profile Image",
      width: 200,
      renderCell: (params) => <img src={params.value} alt="Astrologer" />,
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "languages",
      headerName: "Languages",
      width: 150,
      sortable: false,
    },
    {
      field: "specialities",
      headerName: "specialities",//specialities
      width: 200,
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => handleEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="80vh" 
    >
      <Grid item xs={12} md={8} lg={10}>
        <Typography variant="h4" align="center" gutterBottom>
          All Astrologers
        </Typography>
        <DataGrid
          rows={astrologers}
          columns={columns}
          disableColumnMenu
          disableColumnSelector
          hideFooterPagination
          getRowId={(row) => row._id}
        />
      </Grid>
    </Grid>
  );
};

