


import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { RootState, AppDispatch } from "../redux/store";
import { postAstrologerAsync } from "../redux/astrologersSlice";
import { useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [specialities, setSpecialties] = useState<string[]>([]);
  const [profileImageUrl, setimage] = useState(""); 

  const handleLanguageChange = (event: SelectChangeEvent<string[]>) => {
    setLanguages(event.target.value as string[]);
  };

  const handleSpecialtiesChange = (event: SelectChangeEvent<string[]>) => {
    setSpecialties(event.target.value as string[]);
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value as string);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoading(true);
    setError(null);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const uploadUrl = `https://api.cloudinary.com/v1_1/dagvmxeqo/image/upload?upload_preset=g9ydxl82&api_key=663333495545963`;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        setimage(data.secure_url);
      } catch (error) {
        setError("Failed to upload image");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);
    try {
      await dispatch(
        postAstrologerAsync({
          name,
          gender,
          email,
          languages,
          specialities, //specialities
          profileImageUrl, //postAstrologerAsync
        })
      );

     
      setName("");
      setGender("");
      setEmail("");
      setLanguages([]);
      setSpecialties([]);
      setimage(""); // Clear the profile image URL

      // Show success toast
      toast.success("Astrologer registered successfully");
    } catch (error) {
      setError("Failed to register astrologer");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "7rem" }}
    >
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Add Astrologer
            </Typography>
            <form onSubmit={handleSubmit}>
              {error && <Typography color="error">{error}</Typography>}
              <TextField
                label="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                fullWidth
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Gender</InputLabel>
                <Select value={gender} onChange={handleGenderChange}>
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                fullWidth
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Languages</InputLabel>
                <Select
                  multiple
                  value={languages}
                  onChange={handleLanguageChange}
                  renderValue={(selected: string[]) => selected.join(", ")}
                >
                  {["JavaScript", "NodeJs", "React", "HTML"].map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" required>
                <InputLabel>Specialties</InputLabel>
                <Select
                  multiple
                  value={specialities}
                  onChange={handleSpecialtiesChange}
                  renderValue={(selected: string[]) => selected.join(", ")}
                >
                  {["Mern Stack", "Backend", "UI/UX", "Frontend"].map(
                    (specialty) => (
                      <MenuItem key={specialty} value={specialty}>
                        {specialty}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" required>
                <InputLabel>Profile Image</InputLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }} // Hide the default file input
                  id="profile-image-input"
                />
                <label htmlFor="profile-image-input">
                  <Button
                    variant="contained"
                    // color="default"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload a file
                  </Button>
                </label>
                {profileImageUrl && (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    style={{ maxWidth: "100%", marginTop: "1rem" }}
                  />
                )}
              </FormControl>
              <Button
                type="submit"
                // variant="contained"
                variant="outlined"
                color="primary"
                disabled={loading}
                style={{marginTop:'10px'}}
              >
                {loading ? "Loading..." : "Register"}
              </Button>
              {/* <Button variant="outlined">Outlined</Button> */}
            </form>
          </CardContent>
        </Card>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Register;
