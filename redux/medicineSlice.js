import { createSlice } from '@reduxjs/toolkit';

const medicineSlice = createSlice({
  name: 'medicine',
  initialState: {
    medicineList: [],
  },
  reducers: {
    addMedicine: (state, action) => {
      state.medicineList.push(action.payload);
    },
    deleteMedicine: (state, action) => {
      state.medicineList.splice(action.payload, 1);
    },
    updateMedicine: (state, action) => {
      const { index, updatedMedicine } = action.payload;
      if (state.medicineList[index]) {
        state.medicineList[index] = updatedMedicine;
      }
    },
  },
});

export const { addMedicine, deleteMedicine, updateMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;    