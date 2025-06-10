// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getCabins } from "@/app/_lib/data-service";

// export const fetchCabins = createAsyncThunk("cabins/fetchCabins", async () => {
//   const data = await getCabins();
//   return data;
// });
// const cabinsSlice = createSlice({
//   name: "cabins",
//   initialState: {
//     cabins: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCabins.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCabins.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.cabins = action.payload;
//       })
//       .addCase(fetchCabins.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });
// export default cabinsSlice.reducer;
