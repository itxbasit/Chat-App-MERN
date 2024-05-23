import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './ReduxStore/notificationReducer'
import { tokenReducer,  headingReducer, userReducer, inputReducer } from './ReduxStore/setting'

export default configureStore({
    reducer: {
        notification: notificationReducer,
        heading: headingReducer,
        token: tokenReducer,
        users: userReducer,
        msgV: inputReducer
    },
})