import { RxChevronRight } from "react-icons/rx";

export const Hero = () => {
  return (
    <header className="h-[650px] bg-hero-pattern overflow-hidden bg-center">
      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat h-[100vh] flex items-center justify-center text-neutral-900">
        <div className="container flex">
          <div className="w-1/2">
            <p className="uppercase">Selamat datang di layanan rekmed</p>
            <h2 className="text-5xl font-bold">
              Integrated <span className="text-green-main">Digital Medical Records</span> for Better Healthcare.
            </h2>
            <p>
              <span className="text-green-main">Tingkatkan efisiensi</span> dan <span className="text-green-main">kualitas layanan</span> kesehatan Anda dengan sistem rekam medis elektronik yang cepat, aman, dan mudah diakses kapan saja.
            </p>
            <button
              className="flex bg-green-main space-x-2 text-white mt-4 rounded-xl py-5 px-9 font-bold hover:bg-green-600 transition-all duration-200 ease-in-out"
            >
              <p>Book an Appointment</p>
              <RxChevronRight size={24} />
            </button>
          </div>
          <div className="w-1/2">
            <img src="/doctor_nurse.png" alt="Doctor and Nurse" />
          </div>
        </div>
      </div>
    </header>
  );
};
