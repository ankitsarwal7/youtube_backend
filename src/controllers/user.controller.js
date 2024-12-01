import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser = asyncHandler(async (req, res) => {
   // get user details from frontend
   // validation -not empty
   // check if user already exist: username, email
   // check for image , check for avtar
   // upload them to cloudinary, avatar
   // create user object- create entry in db
   // remove password and refresh token field from response
   // check for user creation 
   // return res
   


   const {username, fullName, email}= req.body
console.log("email", email );
if (
    [fullName, email, username, password].some((field) => field?.trim() ==="")

) {
    throw new ApiError(400, "all fields are required")
}
 
const existedUser = User.findOne({
    $or: [{ username }, { email }]
})
if (existedUser) {
    throw new ApiError(409,"User with email or username is already exist")
}
 
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path

if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required")
}
  
const avatar = await uploadOnCloudinary(avatarLocalPath) 
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if (!avatar) {
    throw new ApiError(400, "avatar file is required")

}














})


export {registerUser} 