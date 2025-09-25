"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreatePage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    duration: "",
    instituteRequired: "no",
    instituteName: "",
    domains: [] as string[],
    certified1: false,
    certified2: false,
    link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.type === "checkbox" ? target.checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sendData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Creating project...");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/project/user_id/${id}`,
        formData
      );

      if (res.status === 201) {
        toast.success("Project created successfully!", { id: toastId });
        router.push("/project");
      }
    } catch (error) {
      toast.error("Failed to create project.", { id: toastId });
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const newDomains = checked
        ? [...prev.domains, name]
        : prev.domains.filter((domain) => domain !== name);
      return { ...prev, domains: newDomains };
    });
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 h-[90%] overflow-auto">
          <h2 className="text-3xl font-semibold mb-4 px-8">
            Create Your New Project
          </h2>
          <hr className="py-2 border-gray-300" />
          <form className="py-2 px-8">
            <label className="text-lg font-lato font-semibold">
              Project Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 my-2 border rounded border-[#A3A3A3] text-ellipsis font-dmsans font-normal"
              />
            </label>

            <label className="text-lg font-lato font-semibold">
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 my-2 border rounded border-[#A3A3A3] text-ellipsis font-dmsans font-normal"
              />
            </label>

            <label className="text-lg font-lato font-semibold">
              Minimum Requirements:
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full p-2 my-2 border rounded border-[#A3A3A3] text-ellipsis font-dmsans font-normal"
              />
            </label>

            <label className="text-lg font-lato font-semibold">
              Possible Responsibilities:
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                className="w-full p-2 my-2 border rounded border-[#A3A3A3] text-ellipsis font-dmsans font-normal"
              />
            </label>

            <div className="flex gap-10">
              <label className="text-lg font-lato font-semibold w-[35%]">
                Project Duration:
                <br />
                <div>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-2 my-2 border rounded border-[#A3A3A3] text-ellipsis font-dmsans font-normal"
                  >
                    <option value=""></option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>
              </label>

              <div className=" w-[50%] flex flex-col items-center">
                <div className="flex justify-between w-full ">
                  <div>
                    <p className="text-lg font-lato font-semibold">
                      Project for Institute?:
                    </p>
                    <p className="text-sm">
                      (This will ensure that only the team members from your
                      organization can apply.
                    </p>
                  </div>

                  <label>
                    <input
                      type="radio"
                      name="instituteRequired"
                      value="yes"
                      checked={formData.instituteRequired === "yes"}
                      onChange={handleChange}
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="instituteRequired"
                      value="no"
                      checked={formData.instituteRequired === "no"}
                      onChange={handleChange}
                    />{" "}
                    No
                  </label>
                </div>

                <div className="w-full">
                  {formData.instituteRequired === "yes" && (
                    <input
                      type="text"
                      name="instituteName"
                      value={formData.instituteName}
                      onChange={handleChange}
                      className="w-full p-2 my-2 border rounded border-[#A3A3A3] text-ellipsis font-dmsans font-normal"
                      placeholder="Enter college name"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="w-[60%]">
              <p className="text-lg font-lato font-semibold">
                Project Domains:
              </p>
              <div className="w-full flex justify-start mb-6 items-center gap-[10%]">
                <label className="min-w-fit">
                  <input
                    type="checkbox"
                    name="aiMl"
                    onChange={handleDomainChange}
                    className="mr-2 size-5"
                  />{" "}
                  AI/ML
                </label>
                <label className="min-w-fit">
                  <input
                    type="checkbox"
                    name="webApp"
                    onChange={handleDomainChange}
                    className="mr-2 size-5"
                  />{" "}
                  Web-App
                </label>
                <label className="min-w-fit">
                  <input
                    className="mr-2 size-5"
                    type="checkbox"
                    name="androidApp"
                    onChange={handleDomainChange}
                  />{" "}
                  Android App
                </label>
                <input
                  type="text"
                  name="other"
                  id="other"
                  placeholder="other"
                  className="px-2 py-1 border rounded border-[#A3A3A3] text-ellipsis font-dmsans font-normal"
                />
              </div>
            </div>

            <label className="text-lg font-lato font-semibold">
              Links (Community/Meet):
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full p-2 my-2 border rounded border-[#A3A3A3] text-ellipsis mb-8 font-dmsans font-normal"
              />
            </label>

            <label className="font-lato">
              <input
                type="checkbox"
                name="certified1"
                className="mr-2 size-5"
                checked={formData.certified1}
                onChange={handleChange}
              />
              I hereby certify that, to the best of my knowledge, the provided
              information is true and accurate.
            </label>
            <label className="font-lato block mt-3">
              <input
                type="checkbox"
                name="certified2"
                className="mr-2 size-5"
                checked={formData.certified2}
                onChange={handleChange}
              />
              On submiting, your project will be sent for evaluation and
              deciding the rank of the project based pn difficulty. This may
              take some time.
            </label>
            <div className="flex justify-between space-x-4 py-4">
              <button
                onClick={sendData}
                type="submit"
                className={`mt-5 p-2 px-4 text-white rounded transition-colors duration-300 ${
                  formData.certified1 && formData.certified2
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-400 cursor-not-allowed"
                }`}
                disabled={
                  !formData.certified1 || !formData.certified2 || isSubmitting
                }
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="mt-5 p-2 px-4 border border-black rounded hover:bg-gray-100 transition-colors duration-300"
                onClick={() => {
                  router.push("/project");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
