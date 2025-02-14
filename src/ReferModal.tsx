import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const ReferralModal = ({
  isOpen,
  onClosee,
}: {
  isOpen: boolean;
  onClosee: () => void;
}) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState("friends");
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [friendDetails, setFriendDetails] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const changeFormStep = async (e: any) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
    setFormStep("refer");
  };

  const handleUserDetails = async (data: any, e: any) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }

    try {
      setLoading(true);
      await axios.post("https://accredian-backend-task-quq4.onrender.com/friendDetails", {
        name: data.friendName,
        email: data.friendemail,
        phone: data.friendphone,
        course: data.course,
      });

      await axios.post("https://accredian-backend-task-quq4.onrender.com/user", {
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      await axios.post("https://accredian-backend-task-quq4.onrender.com/email", {
        name: data.friendName,
        email: data.friendemail,
      });
      setLoading(false);
      toast.success("Referred successfully");
      onClosee();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="flex md:w-full w-[90%] md:h-[55%] h-fit max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div
          className="w-1/2 hidden bg-blue-600 md:flex items-center justify-center p-6"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/refer-modal-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 w-full p-6 relative overflow-y-scroll hide-scroll">
          {/* Close Button */}
          <button
            onClick={onClosee}
            className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
          {formStep === "refer" && (
            <button
              onClick={() => setFormStep("friends")}
              className="absolute cursor-pointer text-sm top-4 left-6 text-blue-500 "
            >
              Back
            </button>
          )}

          {/* Heading */}
          <h2 className="text-xl text-center font-semibold text-gray-900">
            Refer your <span className="text-blue-600 font-bold">friend!</span>
          </h2>

          {/* Progress Bar */}
          <div className="flex relative justify-center gap-28 items-center pb-2 pt-3 mt-2">
            <div className="flex flex-col items-center gap-1">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-xs text-gray-600 font-medium">
                Friend’s details
              </span>
            </div>
            <div
              className={`w-[150px] absolute md:right-[26%] right-[20%] -mt-5 h-[1.5px] ${
                formStep === "friends" ? "bg-gray-300" : "bg-blue-500"
              }`}
            ></div>
            <div className="flex flex-col items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  formStep === "friends" ? "bg-gray-300" : "bg-blue-500"
                }`}
              ></span>
              <span className="text-xs text-gray-500">Refer now</span>
            </div>
          </div>

          {formStep === "friends" ? (
            <>
              <form onSubmit={handleSubmit(changeFormStep)} action="">
                <div className="mt-2 space-y-4">
                  <input
                    type="text"
                    {...register("friendName", {
                      required: true,
                    })}
                    placeholder="Enter friend's name"
                    value={friendDetails.name}
                    required
                    onChange={(e) =>
                      setFriendDetails({
                        ...friendDetails,
                        name: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none p-1 text-xs border-b border-gray-300"
                  />
                  {errors.friendName && (
                    <p className="text-xs text-red-600">
                      {errors.friendName.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                  <input
                    type="email"
                    {...register("friendemail", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    placeholder="Enter friend's email"
                    value={friendDetails.email}
                    required
                    onChange={(e) =>
                      setFriendDetails({
                        ...friendDetails,
                        email: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none p-1 text-xs border-b border-gray-300"
                  />
                  {errors.friendemail && (
                    <p className="text-red-600 text-xs">
                      {errors.friendemail.type === "required" &&
                        "This field is required"}
                      {errors.friendemail.type === "pattern" &&
                        "Invalid email type"}
                    </p>
                  )}
                  <input
                    type="number"
                    {...register("friendphone", {
                      required: true,
                      pattern: /^\d{10}$/,
                    })}
                    placeholder="+91 Friend’s phone number"
                    value={friendDetails.phone}
                    required
                    onChange={(e) =>
                      setFriendDetails({
                        ...friendDetails,
                        phone: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none p-1 text-xs border-b border-gray-300"
                  />
                  {errors.friendphone && (
                    <p className="text-xs text-red-600">
                      {errors.friendphone.type === "required" &&
                        "This field is required"}
                      {errors.friendphone.type === "pattern" &&
                        "Invalid phone type"}
                    </p>
                  )}
                  <select
                    value={friendDetails.course}
                    {...register("course", {
                      required: true,
                    })}
                    onChange={(e) =>
                      setFriendDetails({
                        ...friendDetails,
                        course: e.target.value,
                      })
                    }
                    className="w-full p-2 text-xs border-b border-gray-300"
                  >
                    <option>Select Vertical</option>
                    <option>Technology</option>
                    <option>Marketing</option>
                    <option>Finance</option>
                  </select>
                  {errors.course && (
                    <p className="text-xs text-red-600">
                      {errors.course.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full cursor-pointer bg-blue-600 text-white py-1 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                >
                  Next
                </button>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(handleUserDetails)} action="">
                <div className="mt-2 space-y-6">
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    {...register("name", {
                      required: true,
                    })}
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        name: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none p-1 text-xs border-b border-gray-300"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.type === "required" &&
                        "This field is required"}
                    </p>
                  )}
                  <input
                    type="email"
                    required
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                    placeholder="Enter your email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none p-1 text-xs border-b border-gray-300"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.type === "required" &&
                        "This field is required"}
                      {errors.email.type === "pattern" && "Invalid email type"}
                    </p>
                  )}
                  <input
                    type="number"
                    {...register("phone", {
                      required: true,
                      pattern: /^\d{10}$/,
                    })}
                    placeholder="+91 phone number"
                    pattern="/^[0-9]{10}$/"
                    value={userDetails.phone}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        phone: e.target.value,
                      })
                    }
                    className="w-full focus:outline-none p-1 text-xs border-b border-gray-300"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600">
                      {errors.phone.type === "required" &&
                        "This field is required"}
                      {errors.phone.type === "pattern" && "Invalid phone type"}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-1 rounded-lg text-lg cursor-pointer font-semibold hover:bg-blue-700 transition"
                >
                  {loading ? "Referring..." : "Refer"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;
