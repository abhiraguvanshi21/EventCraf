import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Calendar,
  Mail,
  Lock,
  User,
  Store,
  Tags,
  Loader,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    vendorType: "",
    accountType: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword, accountType } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      accountType === "vendor" &&
      (!formData.shopName || !formData.vendorType)
    ) {
      setError("Please provide your shop name and vendor type");
      return;
    }

    const success = await signup(
      name,
      email,
      password,
      accountType as "user" | "vendor",
      formData.shopName,
      formData.vendorType,
      true
    );

    if (success) {
      if (accountType === "vendor") {
        const existingVendors = JSON.parse(
          localStorage.getItem("vendors") || "[]"
        );

        const newVendor = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          shopName: formData.shopName,
          vendorType: formData.vendorType,
          rating: 0,
          reviews: 0,
          location: "",
          phone: "",
          image: "https://via.placeholder.com/300x200?text=Vendor",
          accountType: "vendor",
          description: "",
          longDescription: "",
          website: "",
          experience: "",
          priceRange: "",
          availability: "",
          services: [],
          portfolio: [],
          packages: [],
          specialties: [],
          testimonials: [],
        };

        existingVendors.push(newVendor);
        localStorage.setItem("vendors", JSON.stringify(existingVendors));
        localStorage.setItem("eventcraft_user", JSON.stringify(newVendor));
        navigate("/vendor-profile/edit");
      } else {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          accountType: "user",
        };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        localStorage.setItem("eventcraft_user", JSON.stringify(newUser));
        navigate("/");
      }
    } else {
      setError("Failed to create account. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-6">
            <Calendar className="h-12 w-12 text-purple-600 mr-3" />
            <span className="text-3xl font-bold text-gray-900">EventCraft</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join as a user or vendor to start booking or listing events
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Join as
              </label>
              <div className="flex justify-center gap-4 mb-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, accountType: "user" })
                  }
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl border transition-all ${
                    formData.accountType === "user"
                      ? "bg-purple-100 border-purple-600 text-purple-600 font-semibold"
                      : "bg-white border-gray-300 text-gray-600"
                  }`}
                >
                  <User className="h-5 w-5" />
                  User
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, accountType: "vendor" })
                  }
                  className={`flex items-center gap-2 px-6 py-2 rounded-xl border transition-all ${
                    formData.accountType === "vendor"
                      ? "bg-purple-100 border-purple-600 text-purple-600 font-semibold"
                      : "bg-white border-gray-300 text-gray-600"
                  }`}
                >
                  <Store className="h-5 w-5" />
                  Vendor
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Book events and manage your celebrations
              </p>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {formData.accountType === "vendor" && (
              <>
                <div>
                  <label
                    htmlFor="shopName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Shop Name
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="shopName"
                      name="shopName"
                      type="text"
                      value={formData.shopName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter shop name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="vendorType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Vendor Type
                  </label>
                  <div className="relative">
                    <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="vendorType"
                      name="vendorType"
                      type="text"
                      value={formData.vendorType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="e.g. Tent Services, Catering"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 flex justify-center"
            >
              {isLoading ? (
                <Loader className="animate-spin h-5 w-5 mr-2" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-500 font-semibold"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
