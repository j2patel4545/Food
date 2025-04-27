import React, { useEffect, useState, useContext } from 'react';
import Food from '../../Context/Fcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { cola } = useContext(Food);
    const [updateHandler, setUpdateHandler] = useState(false);
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8799/user/profile/${cola._id}`);
                const user = response.data?.user;
                if (user) {
                    setUserData(user);
                    setUsername(user.Username || "");
                    setEmail(user.email || "");
                    setAddress(user.Address || "");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [cola._id, updateHandler]);

    const updatePush = async (e) => {
        e.preventDefault();
        if (!username || !email || !address) {
            alert("All fields are required!");
            return;
        }
        try {
            await axios.put(`http://localhost:8799/user/update/${cola._id}`, {
                email,
                Username: username,
                Address: address
            });
            alert("User updated successfully!");
            setUpdateHandler(false);
        } catch (error) {
            console.error("User Update Failed:", error);
            alert("User Update Failed..!");
        }
    };

    const dltHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:8799/user/dlt/${cola._id}`);
            alert("Account Deleted..!");
            navigate('/');
            localStorage.removeItem('uesr');
            localStorage.removeItem('christi');
        } catch (error) {
            console.error("Error: Account NOT Deleted", error);
            alert("ERROR: Unable to delete account.");
        }
    };

    if (!userData) {
        return <div className="text-center min-h-screen flex items-center justify-center text-xl font-bold">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-end justify-center bg-[url('https://static.vecteezy.com/system/resources/previews/031/734/305/non_2x/pattern-with-outline-icons-on-a-theme-kitchen-accessories-and-food-food-background-vegetables-seamless-pattern-healthy-eating-free-vector.jpg')] p-6">
            {updateHandler ? (
                <div className="flex w-screen bg-white rounded-2xl  h-[80vh] shadow-x justify-center shadow-2xl">
                    <form onSubmit={updatePush} className="relative bg-white l rounded-3xl w-full max-w-md p-8 flex flex-col items-center space-y-4">
                        {/* Profile Image */}
                        <div className="absolute -top-16">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                            />
                        </div>

                        <div className="mt-20 w-full flex flex-col gap-4">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 rounded-full py-2 px-5 text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-pink-300"
                                placeholder="Username"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-full py-2 px-5 text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-pink-300"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border border-gray-300 rounded-full py-2 px-5 text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-pink-300"
                                placeholder="Address"
                            />
                        </div>

                        <button type="submit" className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-full transition-all">
                            Save Changes
                        </button>
                        <button type="button" onClick={() => setUpdateHandler(false)} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-full transition-all">
                            Cancel
                        </button>
                    </form>

                </div>

            ) : (
                <div className="flex w-screen bg-white rounded-2xl h-[80vh] justify-center shadow-2xl">
                    <div className="relative bg-white rounded-3xl w-full max-w-md p-8 flex flex-col items-center space-y-4">
                        {/* Profile Image */}
                        <div className="absolute -top-16">
                            <img
                                src="./logo.png"
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 bg-zinc-50 border-white shadow-md object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="mt-20 text-center">
                            <h2 className="text-2xl font-bold text-gray-800">{userData.Username}</h2>
                            <p className="text-sm text-gray-800 mt-1">Email : {userData.email}</p>
                            <p className="text-sm text-gray-800">Adress : {userData.Address}</p>
                        </div>

                        {/* Actions */}
                        <button onClick={() => setUpdateHandler(true)} className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-full transition-all">
                            Edit Profile
                        </button>
                        <button onClick={dltHandler} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full transition-all">
                            Delete Account
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
