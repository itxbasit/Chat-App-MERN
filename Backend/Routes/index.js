import express from 'express'
import SignUp from './signUp.js'
import SignIn from './SignIn.js'
import getUser from './getAllUser.js'
import searchByEmail from './searchByEmail.js'
import profileImg from './profileImg.js'
import about from './about.js'
import update from './update.js'
import verify from './verifyUser.js'
import otherUserEmail from './otherUserByEmail.js'
import addFriends from './addFriend.js'
import cancelReq from './withdrawReq.js'
import delReq from './deleteRequests.js'
import unFriend from './unfriend.js'
import confReq from './confirmRequests.js'
import getNoti from './getNotification.js'
import conversation from "./conversation.js"
import message from './message.js'
import ActiveAt from './ActiveAt.js'


const router = express.Router()

router.use('/SignUp', SignUp)
router.use('/SignIn', SignIn)
router.use('/getUser', getUser)
router.use('/searchByEmail', searchByEmail)
router.use('/profileImg', profileImg)
router.use('/about', about)
router.use('/update', update)
router.use('/verify', verify)
router.use('/otherUserEmail', otherUserEmail)
router.use('/addFriends', addFriends)
router.use('/cancelReq', cancelReq)
router.use('/delReq', delReq)
router.use('/unFriend', unFriend)
router.use('/confReq', confReq)
router.use('/getNoti', getNoti)
router.use('/conversation', conversation)
router.use('/message', message)
router.use('/ActiveAt', ActiveAt)

export default router;