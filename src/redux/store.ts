import { configureStore } from "@reduxjs/toolkit";
import watchReviewModalReducer from './slices/watchReviewModalSlice'

export const store = configureStore({
    reducer: {
        watchReviewModal: watchReviewModalReducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;