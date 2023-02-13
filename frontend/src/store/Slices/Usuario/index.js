import { createSlice } from "@reduxjs/toolkit";
const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    datos: {},
    carrito: [],
  },
  reducers: {
    setDatos: (state, action) => {
      state.datos = action.payload;
    },
    setCarrito: (state, action) => {
      state.datos.carrito = action.payload;
    },
  },
});

export const { setDatos, setCarrito } = usuarioSlice.actions;

export default usuarioSlice.reducer;
