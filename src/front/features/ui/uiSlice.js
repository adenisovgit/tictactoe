import { createSlice } from '@reduxjs/toolkit';


const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notificationType: 'init', notificationShow: false, message: '',
  },
  reducers: {
    setNotification: (_state, action) => action.payload,
    closeNotification: (message = '') => ({ notificationType: 'info', notificationShow: false, message }),
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
