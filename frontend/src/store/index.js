import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./Slices/Usuario";

export default configureStore({
  reducer: {
    usuario: usuarioReducer,
  },
});
