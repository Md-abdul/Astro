import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Astrologer, editAstrologerAsync } from "../redux/astrologersSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Edit = () => {
  const nevigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const [astrologer, setAstrologer] = useState<Astrologer | null>(null);
  const [updatedAstrologer, setUpdatedAstrologer] = useState<Astrologer | null>(
    null
  );

  const astrologerList = useSelector(
    (state: RootState) => state.astrologers.list
  );

  useEffect(() => {
    const selectedAstrologer = astrologerList.find((a) => a._id === _id);
    if (selectedAstrologer) {
      const { _id, ...astrologerData } = selectedAstrologer;
      setAstrologer(selectedAstrologer);
      setUpdatedAstrologer(astrologerData);
    } else {
      setAstrologer(null);
      setUpdatedAstrologer(null);
    }
  }, [astrologerList, _id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedAstrologer || !astrologer?._id) return;
    dispatch(editAstrologerAsync(astrologer._id, updatedAstrologer));
    toast.success("Astrologer updated successfully!");
    setTimeout(() => {
      nevigate("/");
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!updatedAstrologer) return;
    setUpdatedAstrologer({
      ...updatedAstrologer,
      [name]: value,
    });
  };

  if (!astrologer) {
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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Edit Astrologer
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={updatedAstrologer?.name || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={updatedAstrologer?.gender || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={updatedAstrologer?.email || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="languages"
                    name="languages"
                    value={updatedAstrologer?.languages || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="specialities"
                    name="specialities"
                    value={updatedAstrologer?.specialities || ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="profileImageUrl"
                    name="profileImageUrl"
                    value={updatedAstrologer?.profileImageUrl || ""} //profileImageUrl
                    onChange={handleChange}
                  />
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};



