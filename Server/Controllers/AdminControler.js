import jwt from 'jsonwebtoken';

const SECRET_KEY = "your_secret_key"; // 🔹 In production, store this in an environment variable

// ✅ Admin Login Only
export const AdminLogin = async (req, res) => {
    const { email, mobileNumber } = req.body;

    try {
        // ✅ Hardcoded admin credentials
        const adminEmail = "admin@gmail.com";
        const adminMobileNumber = "123";

        // ✅ Validate credentials
        if (email !== adminEmail || mobileNumber !== adminMobileNumber) {
            return res.status(400).json({ message: "Invalid Credentials..!" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: "admin_id", email: adminEmail },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login Successful!",
            token,
            admin: {
                email: adminEmail,
                mobileNumber: adminMobileNumber,
                Username: "Admin",
                Address: "Admin Address"
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server Error, Login Failed!" });
    }
};

// ✅ Fetch Hardcoded Admin Profile
export const AdminProfile = async (req, res) => {
    try {
        const admin = {
            email: "admin@gmail.com",
            mobileNumber: "123",
            Username: "Admin",
            Address: "Admin Address"
        };

        return res.status(200).json({ message: "Admin Profile", admin });

    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return res.status(500).json({ message: "Server Error, Profile Not Found!" });
    }
};
