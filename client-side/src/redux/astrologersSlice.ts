import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import {
  fetchAstrologers as fetchAstrologersAPI,
  postAstrologer as postAstrologerAPI,
  editAstrologer as editAstrologerAPI,
} from "../services/api";


interface Astrologer {
  _id?: string;
  name: string;
  gender: string;
  email: string;
  languages: string[];
  specialities: string[]; // specialities Updated to match the backend property name
  profileImageUrl: string;
}

interface AstrologersState {
  list: Astrologer[];
  loading: boolean;
  error: string | null;
}

const initialState: AstrologersState = {
  list: [],
  loading: false,
  error: null,
};

const astrologersSlice = createSlice({
  name: "astrologers",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<Astrologer[]>) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    postStart(state) {
      state.loading = true;
      state.error = null;
    },
    postSuccess(state, action: PayloadAction<Astrologer>) {
      state.loading = false;
      state.list.push(action.payload);
    },
    postFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editStart(state) {
      state.loading = true;
      state.error = null;
    },
    editSuccess(state, action: PayloadAction<Astrologer>) {
      state.loading = false;
      const index = state.list.findIndex(
        (astrologer) => astrologer._id === action.payload._id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    editFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add other reducers for CRUD operations if needed
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  postStart,
  postSuccess,
  postFailure,
  editStart,
  editSuccess,
  editFailure,
} = astrologersSlice.actions;

export default astrologersSlice.reducer;

// Thunks
export const fetchAstrologersAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchStart());
    const data = await fetchAstrologersAPI();
    dispatch(fetchSuccess(data));
  } catch (error: any) {
    dispatch(fetchFailure(error.message));
  }
};

export const postAstrologerAsync =
  (astrologer: Astrologer): AppThunk =>
  async (dispatch) => {
    try {
      // Validate astrologer data
      if (
        !astrologer.name ||
        !astrologer.gender ||
        !astrologer.email ||
        !astrologer.languages ||
        !astrologer.specialities ||
        !astrologer.profileImageUrl
      ) {
        throw new Error("Please provide all required fields.");
      }

      dispatch(postStart());
      const data = await postAstrologerAPI(astrologer);
      dispatch(postSuccess(data));
    } catch (error: any) {
      dispatch(postFailure(error.message));
    }
  };


  export const editAstrologerAsync =
  (astrologerId: string, astrologerData: Partial<Astrologer>): AppThunk =>
  async (dispatch) => {
    try {
      if (
        !astrologerId || // Ensure _id is present for editing
        !astrologerData.name ||
        !astrologerData.gender ||
        !astrologerData.email ||
        !astrologerData.languages ||
        !astrologerData.specialities ||
        !astrologerData.profileImageUrl
      ) {
        throw new Error("Please provide all required fields.");
      }

      dispatch(editStart());
      const data = await editAstrologerAPI(astrologerId, astrologerData);
      dispatch(editSuccess(data));
    } catch (error: any) {
      dispatch(editFailure(error.message));
    }
  };


  

export type { Astrologer };
