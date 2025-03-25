import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res) =>{
    //1.extract all required field from the req body
    //2.check the all fiels are given
    //3.check if the user already exit
    //4.check for image , check for avatar
    //5.upload them to cloudinary
    //6.create user object - create entry in db
    //7.save the user info to the db 
    //8.send the response if successfull -remove password and refresh token from response

    const {username,fullName,email,password} = req.body
    //console.table([username,fullName,email,password])

    if (
        [username,fullName,email,password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are reqired") 
    }


    const existedUser = await User.findOne({
        $or:[{ username },{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    //const coverImageLocalPath = req.files?.coverImage[0]?.path
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length > 0){
        coverImageLocalPath =  req.files.coverImage[0].path
    }


    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is required")
    }
    //console.log(avatarLocalPath)
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registring the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered succefully")
    )

})

export {
    registerUser,
}