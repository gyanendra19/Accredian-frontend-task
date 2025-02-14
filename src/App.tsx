import { useState } from "react";
import ReferralModal from "./ReferModal";
import { Toaster } from "react-hot-toast";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="w-full h-screen py-10">
      <Toaster />
      <ReferralModal isOpen={isModalOpen} onClosee={() => setIsModalOpen(false)} />
      <div
          className="relative flex w-[80%] bg-blue-50 bg-cover mx-auto md:h-[90%] h-fit bg-center p-8 rounded-2xl shadow-lg flex-col md:flex-row items-center justify-between md:bg-[url('https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hero-sec-background.svg')]"
      >
        {/* Left Text Section */}
        <div className="max-w-lg text-left text-gray-900">
          <h2 className="md:text-5xl text-2xl font-bold leading-tight">
            Let's Learn <br /> & Earn
          </h2>
          <p className="text-lg mt-2 md:w-[70%] w-full">
            Get a chance to earn{" "}
            <span className="text-blue-600 font-semibold">₹10,000</span> for
            every friend who enrolls!
          </p>
          <button onClick={() => setIsModalOpen(true)} className="mt-6 px-6 cursor-pointer py-1 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
            Refer Now
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
