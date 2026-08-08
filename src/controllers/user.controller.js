import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/apiResponse.js';


const registerUser = asyncHandler(async (req, res) => {
    //     return res.status(200).json({
    //         message: "User Registered Successfully"
    //     })
    // })

    // get user details from frontend 
    // validation - not empty, email format, password strength
    // check if user already exists in the database- username, email
    // check for images, check for avatar, check for profile picture
    // upload them to cloudinary and get the url
    // create user object - create entry in the database
    // remove password and refresh token field from response
    //check for user creation success and send response to frontend
    // send response to frontend with user details and success message
    // return res.status(201).json({ message: 'User registered successfully', user: userDetails });

    const { fullname, email, password, username } = req.body;
    console.log("email", email);
    console.log("req.body", req.body);

    if (
        [fullname, email, password, username].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne(
        {
            //operators
            $or: [{ email }, { username }]
        })
    console.log("existedUser", existedUser);

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    console.log("req.files", req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path
    // console.log("avatarLocalPath", avatarLocalPath);

    const coverImageLocalPath = req.files?.coverImage[0]?.path


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(500, "Avatar upload failed")
    }
    

    const user = await User.create({
        fullname,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url,
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered successfully")
    );

})


export { registerUser }