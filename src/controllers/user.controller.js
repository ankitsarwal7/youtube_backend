import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/Apiresponse.js"

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
console.log("email", email,username,fullName );
if (
    [fullName, email, username, password].some((field) => field?.trim() ==="")

) {
    throw new ApiError(400, "all fields are required")
}
 
const existedUser = await User.findOne({
    $or: [{ username }, { email }]
})
if (existedUser) {
    throw new ApiError(409,"User with email or username is already exist")
}
 
const avatarLocalPath =  req.files?.avatar[0]?.path;
// const coverImageLocalPath =  req.files?.coverImage[0]?.path

let coverImageLocalPath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
    
}

if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required")
}
  
const avatar = await uploadOnCloudinary(avatarLocalPath) 
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if (!avatar) {
    throw new ApiError(400, "avatar file is required")

}

 const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email, 
    password,
    username: username.toLowerCase()
})

 const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
 )
 if (!createdUser) {
    throw new ApiError(500, "something went wrong while user the registration")
    
 }  

return res.status(201).json(
    new ApiResponse(200, createdUser, "user registered successfully")
)










})


export {registerUser} 












 