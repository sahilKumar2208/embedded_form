import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contractTitle: '',
  contractDescription: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateContractTitle(state, action) {
      state.contractTitle = action.payload.value;
    },
    updateContractDescription(state, action) {
      state.contractDescription = action.payload.value;
    },
    setContractEntity(state, action) {
      state.entity = action.payload.value;
    },
    setContractEntitySignatories(state, action) {
      state.entitySignatory = action.payload.value;
    },
    resetForm(state) {
      state.contractTitle = '';
      state.contractDescription = '';
      state.entity = '';
      state.entitySignatory = '';
    },
  },
});

export const {
  updateContractTitle,
  updateContractDescription,
  setContractEntity,
  setContractEntitySignatories,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
