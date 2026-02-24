import User from "../models/userSchema.js"

export const signup = async (req, res) => {

    try {
        // Get info from Frontend
        const { name, email, password, phone, address, role } = req.body

        // Validation and Response
        if (!name || !email || !password || !phone || !address || !role){
            res.status(500).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        
        // Check if the user already exists in the database
        const existingUser = await User.findOne({email})

        // Send response if the user exists 
        if(user){
            res.status(200).jason({
                success:false,
                message:"User already exists , Please login"
            })
        }

        // If the user dosent exist, Create new user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address,
            role
        })
        
        // Create Token 
        // Set up cookies
        // If everythink OK, Send success response to the frontend

    } catch (error) {
        console.log(error);
        res.send(500).json({
            success: false,
            message: "Error in signing up",
            error
        })

    }
}