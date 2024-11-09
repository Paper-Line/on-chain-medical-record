import { RxChevronRight } from "react-icons/rx";

export const Hero = () => {
  return (
    <header className="h-[650px] bg-hero-pattern overflow-hidden bg-center">
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat h-full flex items-center justify-center text-neutral-900">
        <div className="container flex flex-col lg:flex-row h-full">
          <div className="h-full lg:w-1/2 px-4 lg:pr-32 flex flex-col justify-center">
            <p className="uppercase tracking-wider font-medium text-neutral-500 text-sm">Selamat datang di layanan mediuron</p>
            <h2 className="text-3xl lg:text-5xl font-bold my-6">
              Integrated <span className="text-green-main">Digital Medical Records</span> for Better Healthcare.
            </h2>
            <p>
              <span className="text-green-main">Tingkatkan efisiensi</span> dan <span className="text-green-main">kualitas layanan</span> kesehatan Anda dengan sistem rekam medis elektronik yang cepat, aman, dan mudah diakses kapan saja.
            </p>
            <button
              className="flex w-fit bg-green-main space-x-2 text-white mt-6 rounded-xl py-5 px-9 font-bold hover:bg-green-600 transition-all duration-200 ease-in-out"
            >
              <p>Book an Appointment</p>
              <RxChevronRight size={24} />
            </button>
          </div>
          <div className="w-1/2 hidden lg:flex flex-col justify-end items-center">
            <img src="/doctor_nurse.png" alt="Doctor and Nurse" className="max-w-[600px] max-h-[600px]"/>
          </div>
        </div>
      </div>
    </header>
  );
};
