"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/container";
import { Accordion } from "@/components/accordion";
import { TextInput } from "@/components/input";
import { Button } from "@/components/button";

import { addMedicalHistory } from "@/server/controllers/user/medicalHistories";
import useAuthStore from "@/stores/authStore";

function AddMedicalRecordPage() {
  const router = useRouter();

  const { data: userData } = useAuthStore();

  const [complaints, setComplaints] = useState<string>("");
  const [diagnose, setDiagnose] = useState<string>("");
  const [medicalCentre, setMedicalCentre] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [medicalTreatment, setMedicalTreatment] = useState<string>("");
  const [medicineTotalInput, setMedicineTotalInput] = useState<number>(1);
  const [medicines, setMedicines] = useState<any[]>(["", "", "", "", "", ""]);
  const [cost, setCost] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleAddOrRemoveMedicine = (type: string) => {
    if (type == "increase") {
      return setMedicineTotalInput((prev) => prev + 1);
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

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!complaints || !diagnose || !medicalCentre || !date || !medicalTreatment)
      return alert("Please fillPlease fill in all required fields");

    const filterMedicineEmptyString = medicines.filter((item) => item !== "");

    const data = {
      userCode: userData.key,
      diseaseComplaints: [complaints],
      diagnosis: [diagnose],
      treatmentDescription: [medicalTreatment],
      medicalPrescribed: filterMedicineEmptyString,
      cost: parseFloat(cost),
      place: medicalCentre
    };

    try {
      await addMedicalHistory(data);

      alert("Medical History added");
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to add Medical History");
      console.error("Failed to add Medical History:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-2.5 pb-5 sm:p-5 mt-6 sm:mt-12">
      <Container className="mt-3 w-full max-w-screen-xl px-6">
        <h1 className="text-3xl font-medium">Add Medical Records</h1>
      </Container>

      <div className="">
        <Container className="mt-3 w-full max-w-screen-xl overflow-hidden">
          <form onSubmit={handleSubmitForm}>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Accordion
                initialOpen
                title="General Info"
                containerClassName="bg-white h-full p-3 sm:p-5"
                body={
                  <div className="pt-5">
                    <div className="flex flex-col">
                      <label htmlFor="complaints" className="text-neutral-500 text-xs transition-all duration-300">
                        <span className="text-red-500">*</span>
                        Disease / Complaint:
                      </label>
                      <textarea
                        id="complaints"
                        name="complaints"
                        className="w-full mt-1 p-1 bg-transparent transition-colors duration-300 rounded-md border border-neutral-200 hover:border-green-500  placeholder-shown:border-neutral-200 focus:outline-none focus:border-green-300"
                        value={complaints}
                        onChange={(e) => setComplaints(e.target.value)}
                        rows={4}
                        cols={40}
                        required
                      />
                      <p className="text-right">{diagnose?.length}/500</p>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="diagnose" className="text-neutral-500 text-xs transition-all duration-300">
                        <span className="text-red-500">*</span>
                        Diagnose:
                      </label>
                      <textarea
                        id="diagnose"
                        name="diagnose"
                        className="w-full mt-1 p-1 bg-transparent transition-colors duration-300 rounded-md border border-neutral-200 hover:border-green-500  placeholder-shown:border-neutral-200 focus:outline-none focus:border-green-300"
                        value={diagnose}
                        onChange={(e) => setDiagnose(e.target.value)}
                        rows={4}
                        cols={40}
                        required
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
                      value={medicalCentre}
                      onChange={(e) => setMedicalCentre(e.target.value)}
                      containerClassName="mt-3"
                      inputClassName="h-10 mt-1 p-2 border rounded-md"
                      required
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
                      required
                    />
                  </div>
                }
              />

              <Accordion
                initialOpen
                title="Medical Info"
                containerClassName="bg-white h-full p-3 sm:p-5"
                body={
                  <div className="pt-5 h-fit">
                    <div className="flex flex-col">
                      <label htmlFor="medicalTreatment" className="text-neutral-500 text-xs transition-all duration-300">
                        <span className="text-red-500">*</span>
                        Medical Treatments:
                      </label>
                      <textarea
                        id="medicalTreatment"
                        name="medicalTreatment"
                        className="w-full mt-1 p-1 bg-transparent transition-colors duration-300 rounded-md border border-neutral-200 hover:border-green-500  placeholder-shown:border-neutral-200 focus:outline-none focus:border-green-300"
                        value={medicalTreatment}
                        onChange={(e) => setMedicalTreatment(e.target.value)}
                        rows={4}
                        cols={40}
                        required
                      />
                    </div>

                    <div className="mt-3 flex flex-col">
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
                    </div>

                    <div className="flex flex-row gap-x-2">
                      {medicineTotalInput < 6 && (
                        <Button
                          type="button"
                          onClick={() => handleAddOrRemoveMedicine("increase")}
                          className="mt-1 w-20 py-0.5 text-xs font-semibold rounded-lg"
                        >
                          + Add
                        </Button>
                      )}
                      {medicineTotalInput > 1 && (
                        <Button
                          type="button"
                          onClick={() => handleAddOrRemoveMedicine("decrease")}
                          className="mt-1 w-20 py-0.5 text-xs font-semibold bg-red-50 text-red-500 border border-red-400 rounded-lg"
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    <TextInput
                      type="number"
                      label={
                        <>
                          <span className="text-red-500">*</span>
                          Cost (IDR):
                        </>
                      }
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      containerClassName="mt-3"
                      inputClassName="h-10 mt-1 p-2 border rounded-md"
                      required
                    />
                  </div>
                }
              />
            </div>

            <div className="mt-5 lg:mt-10 w-full flex justify-center">
              <Button type="submit" onClick={() => {}} className="md:max-w-72" loading={loading}>
                Save New Record
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </main>
  );
}

export default AddMedicalRecordPage;
