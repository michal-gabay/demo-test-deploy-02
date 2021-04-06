
import { configureStore } from '@reduxjs/toolkit';
import userReduser from './user.reducer';

const store = configureStore({
    reducer: {
        user: userReduser
    }
});

export default store;