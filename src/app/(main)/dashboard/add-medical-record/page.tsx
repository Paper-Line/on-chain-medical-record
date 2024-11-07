"use client";

import { useState } from "react";

import Container from "@/components/container";

import { Accordion } from "@/components/accordion";
import { TextInput } from "@/components/input";

function AddMedicalRecordPage() {
  const [diagnose, setDiagnose] = useState<string>("");
  const [outlet, setOutlet] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [medicineTotalInput, setMedicineTotalInput] = useState<number>(1);
  const [medicines, setMedicines] = useState<any[]>(["", "", "", "", "", ""]);
  const [medicalTreatment, setMedicalTreatment] = useState<string>("");

  const handleAddOrRemoveMedicine = (type: string) => {
    if (type == "increase") {
      setMedicineTotalInput((prev) => prev + 1);

      return;
    }

    setMedicineTotalInput((prev) => prev - 1);
  };

  const handleChangeMedicineInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = medicines.map((item, i) => {
      if (i === index) {
        return e.target.value;
      }
      return item;
    });
    setMedicines(newInputs);
  };

  return (
    <main className="px-2.5 sm:px-5 mt-6 sm:mt-12">
      <div className="px-6">
        <h1 className="text-3xl font-medium">Add Medical Records</h1>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Container className="mt-3 w-full h-fit max max-w-screen-xl rounded-2xl shadow-md overflow-hidden">
          <Accordion
            initialOpen
            title="General Info"
            containerClassName="bg-white p-3 sm:p-5"
            body={
              <div className="pt-5">
                <div className="flex flex-col">
                  <label htmlFor="diagnose" className="text-neutral-500 text-xs transition-all duration-300">
                    <span className="text-red-500">*</span>
                    Diagnose:
                  </label>
                  <textarea
                    id="diagnose"
                    name="diagnose"
                    className="w-full mt-1 p-1 bg-transparent transition-colors duration-300 rounded-md border border-neutral-500 hover:border-green-500  placeholder-shown:border-neutral-200 focus:outline-none focus:border-green-300"
                    value={diagnose}
                    onChange={(e) => setDiagnose(e.target.value)}
                    rows={4}
                    cols={40}
                  />
                  <p className="text-right">{diagnose?.length}/500</p>
                </div>
                <TextInput
                  type="text"
                  label={
                    <>
                      <span className="text-red-500">*</span>
                      Health Centre:
                    </>
                  }
                  value={outlet}
                  onChange={(e) => setOutlet(e.target.value)}
                  containerClassName="mt-3"
                  inputClassName="h-10 mt-1 p-2 border rounded-md"
                />
                <TextInput
                  type="date"
                  label={
                    <>
                      <span className="text-red-500">*</span>
                      Date:
                    </>
                  }
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  containerClassName="mt-3"
                  inputClassName="h-10 mt-1 p-2 border rounded-md"
                />
              </div>
            }
          />
        </Container>

        <Container className="mt-3 w-full h-fit max-w-screen-xl rounded-2xl shadow-md overflow-hidden">
          <Accordion
            initialOpen
            title="Medical Info"
            containerClassName="bg-white p-3 sm:p-5"
            body={
              <div className="pt-5 h-fit">
                {Array.from(Array(medicineTotalInput).keys()).map((_, index) => {
                  return (
                    <TextInput
                      key={index}
                      type="text"
                      label={
                        index === 0 ? (
                          <>
                            <span className="text-red-500">*</span>
                            Medicines:
                          </>
                        ) : (
                          ""
                        )
                      }
                      placeholder="Add Medicine"
                      value={medicines[index]?.text}
                      onChange={(e) => handleChangeMedicineInput(e, index)}
                      inputClassName="h-10 mt-1 p-2 border rounded-md"
                    />
                  );
                })}
                <div className="flex flex-row gap-x-2">
                  {medicineTotalInput < 6 && (
                    <button
                      onClick={() => handleAddOrRemoveMedicine("increase")}
                      className="mt-1 w-20 py-0.5 text-xs font-semibold text-green-500 border border-green-400 rounded-md"
                    >
                      + Add
                    </button>
                  )}
                  {medicineTotalInput > 1 && (
                    <button
                      onClick={() => handleAddOrRemoveMedicine("decrease")}
                      className="mt-1 w-20 py-0.5 text-xs font-semibold text-red-500 border border-red-400 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="mt-3 flex flex-col">
                  <label htmlFor="medicalTreatment" className="text-neutral-500 text-xs transition-all duration-300">
                    <span className="text-red-500">*</span>
                    Medical Treatments:
                  </label>
                  <textarea
                    id="medicalTreatment"
                    name="medicalTreatment"
                    className="w-full mt-1 p-1 bg-transparent transition-colors duration-300 rounded-md border border-neutral-500 hover:border-green-500  placeholder-shown:border-neutral-200 focus:outline-none focus:border-green-300"
                    value={medicalTreatment}
                    onChange={(e) => setMedicalTreatment(e.target.value)}
                    rows={4}
                    cols={40}
                  />
                </div>
              </div>
            }
          />
        </Container>
      </div>
    </main>
  );
}

export default DashboardPage;
