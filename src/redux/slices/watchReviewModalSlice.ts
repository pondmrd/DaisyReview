import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateProp = {
    isOpen: boolean,
    locationId: number | null
}

const initialState: StateProp = {
    isOpen: false,
    locationId: null
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        handleOpenModal: (state, action: PayloadAction<number>) => {
            state = { ...state, isOpen: true, locationId: action.payload }
        },
        handleCloseModal: (state) => {
            state.isOpen = false
            state.locationId = null
        }
    },
})

export const { handleOpenModal, handleCloseModal } = appSlice.actions
export default appSlice.reducer