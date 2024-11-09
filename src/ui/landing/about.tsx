import { twMerge } from "tailwind-merge";

import { SiFsecure, SiFastapi, SiBlockchaindotcom } from "react-icons/si";
import { PiCubeTransparentFill } from "react-icons/pi";
import { RiDatabaseFill } from "react-icons/ri";

import Container from "@/components/container";

const BENEFITS = [
  {
    icon: <SiFsecure size={24} />,
    title: "Maximum Data Privacy and Security",
    desc: "Medical data is encrypted with advanced cryptocurrencies, accessible only to authorized parties"
  },
  {
    icon: <SiBlockchaindotcom size={24} />,
    title: "Decentralization to avoid central authority",
    desc: "Access to data can be managed directly by the user through privacy settings"
  },
  {
    icon: <PiCubeTransparentFill size={24} />,
    title: "Access Transparency and Traceability",
    desc: "Users can access their data anytime and anywhere"
  },
  {
    icon: <SiFastapi size={24} />,
    title: "Quick and Easy Access for Health Providers",
    desc: "Ensure the availability of medical data whenever and wherever it is needed"
  },
  {
    icon: <RiDatabaseFill size={24} />,
    title: "Data-driven Decision Support",
    desc: "Digital medical data makes it easy to analyze patient health trends over time"
  }
];

export const About = () => {
  return (
    <Container className="py-24">
      <div className="max-w-xl mx-auto text-center px-5">
        <h2 className="text-3xl lg:text-5xl text-neutral-800 font-bold">
          About <b className="text-green-main">Mediuron</b>
        </h2>
        <p className="mt-7 text-lg text-neutral-600 leading-tight">
          Secure, private and easily accessible crypto-based medical records give you full control over your health data. Easier access with
          extra security, making your data ready when you need it, anytime, anywhere.
        </p>
      </div>

      <div className="w-full mt-12 p-5">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {BENEFITS.map((item, index) => {
            return (
              <div
                key={index}
                className={twMerge(
                  "p-5 lg:p-10 rounded-3xl border border-neutral-100 shadow-md",
                  index === 0 ? "sm:col-span-2" : index === 1 ? "lg:col-span-2" : index === 3 && "lg:col-span-2"
                )}
              >
                <div className="w-12 h-12 p-1 flex justify-center items-center bg-green-50 rounded-lg border border-green-300">
                  {item.icon}
                </div>

                <div className="max-w-md">
                  <p className="mt-4 sm:mt-8 text-[20px] font-medium">{item.title}</p>
                  <p className="mt-3 text-sm text-neutral-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
