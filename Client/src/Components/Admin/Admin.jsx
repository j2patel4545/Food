import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/adminlogin");
    }
  }, [navigate]);

  const [product, setProduct] = useState({
    name: "",
    qnt: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.qnt || !product.price || !product.image) {
      setMessage("❌ All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("qnt", product.qnt);
    formData.append("price", product.price);
    formData.append("image", product.image);

    try {
      const response = await axios.post("http://localhost:8799/product/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Product added successfully!");
      setProduct({ name: "", qnt: "", price: "", image: null });
      setPreview(null);
      console.log(response.data);
    } catch (error) {
      setMessage("❌ Error adding product!");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br px-10 p-6">
      <div className="w-full items-center bg-cover flex  bg-white/80 backdrop-blur-lg p-4 rounded-3xl shadow-2xl border border-gray-200 transition-all duration-300">
        <div className="flex w-1/2 h-full p-10">
          <div className="rounded-3xl h-[65vh] justify-center items-center bg-center bg-no-repeat bg-cover w-full flex border-amber-50 border-2 bg-[url('https://static.vecteezy.com/system/resources/previews/031/734/305/non_2x/pattern-with-outline-icons-on-a-theme-kitchen-accessories-and-food-food-background-vegetables-seamless-pattern-healthy-eating-free-vector.jpg')]">
            <img className="bg-zinc-50 rounded-full h-[33%]" src="./logo.png" alt="" />
          </div>
        </div>

        <div className="h-full w-1/2 flex flex-col">
          {message && (
            <p className={`mb-6 text-center text-lg font-semibold ${message.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="rounded-2xl backdrop-blur-3xl p-3 space-y-6">
            <div>
              <label className="block mb-2 text-gray-700 font-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Quantity</label>
                <input
                  type="number"
                  name="qnt"
                  placeholder="Enter quantity"
                  value={product.qnt}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-blue-400 rounded-xl p-6 text-center relative hover:bg-blue-50 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FaCloudUploadAlt className="text-blue-400 text-6xl mx-auto mb-2 transition-transform hover:scale-110" />
              <p className="text-gray-700 font-medium">Click or Drag & Drop an Image</p>
            </div>

            {preview && (
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-xl border-4 border-blue-300 shadow-lg transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
