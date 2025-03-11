import {configureStore} from "@reduxjs/toolkit";
import ModalReducer from "./redux/ModalReducer";

const Store = configureStore({
	reducer: {
		modal: ModalReducer,
	},
	
});

export default Store;