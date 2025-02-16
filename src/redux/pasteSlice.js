import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
 
addToPastes: (state, action) => {
  const newPaste = action.payload;
  
 
  const isDuplicate = state.pastes.some(p => p.id === newPaste.id);

  if (isDuplicate) {
    toast.error("Paste already exists!");
    return;
  }

  state.pastes.push(newPaste);
  localStorage.setItem("pastes", JSON.stringify(state.pastes));
  toast.success("Paste Created Successfully",{duration:2000, position: 'top-right'});
},

updateToPastes: (state, action) => {
  const updatedPaste = action.payload;
  const index = state.pastes.findIndex(p => p.id === updatedPaste.id);

  if (index >= 0) {
    state.pastes[index] = updatedPaste;
    localStorage.setItem("pastes", JSON.stringify(state.pastes));
    toast.success("Paste Updated Successfully",{duration:2000, position: 'top-right'});
  }
},
     
    resetToPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((p) => p.id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted Successfully",{duration:2000, position: 'top-right'});
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetToPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
