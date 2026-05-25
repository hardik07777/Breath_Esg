import { useState } from "react";

import axios from "axios";

import {
  UploadCloud,
  FileSpreadsheet,
  Database,
  CheckCircle2,
  Loader2,
  Factory,
  Plane,
  Building2,
} from "lucide-react";

import { StarsBackground } from "../components/StarsBackground";

export default function UploadPage() {

  const [file, setFile] = useState(null);

  const [source, setSource] = useState("SAP");

  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState(null);

  const handleUpload = async () => {

    if (!file) {

      alert("Please select a file");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      formData.append("tenant_id", 1);

      formData.append("source_type", source);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setSummary(response.data);

    } catch (error) {

      console.error(error);

      alert("Upload failed");

    } finally {

      setLoading(false);
    }
  };

  const sourceCards = [
    {
      value: "SAP",
      title: "SAP ERP",
      description:
        "Fuel and procurement exports",
      icon: Factory,
    },
    {
      value: "UTILITY",
      title: "Utility",
      description:
        "Electricity consumption data",
      icon: Building2,
    },
    {
      value: "TRAVEL",
      title: "Travel",
      description:
        "Flights and transport activity",
      icon: Plane,
    },
  ];

  return (

    <StarsBackground
      starColor="rgba(255,255,255,0.15)"
      speed={180}
      className="
        min-h-screen
        bg-[#020617]
        p-6
      "
    >

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <div className="
            flex items-center gap-4
            mb-4
          ">

            <div className="
              bg-gray-700
              text-white
              p-4
              rounded-2xl
            ">

              <UploadCloud size={28} />

            </div>

            <div>

              <h1 className="
                text-4xl
                font-semibold
                tracking-tight
                text-gray-100
              ">
                ESG Data Upload
              </h1>

              <p className="
                text-gray-300
                mt-2
              ">
                Upload operational sustainability data for normalization and review
              </p>

            </div>

          </div>

        </div>

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-4
          mb-8
        ">

          {sourceCards.map((item) => {

            const Icon = item.icon;

            const active =
              source === item.value;

            return (

              <button
                key={item.value}
                onClick={() =>
                  setSource(item.value)
                }
                className={`
                  rounded-2xl
                  border
                  p-5
                  text-left
                  transition-all
                  ${
                    active
                      ? "border-gray-700 bg-gray-200"
                      : "border-gray-300 bg-gray-200 hover:border-gray-500"
                  }
                `}
              >

                <div className="
                  flex items-start justify-between
                  mb-5
                ">

                  <div className="
                    bg-gray-300
                    text-gray-700
                    p-3
                    rounded-xl
                  ">

                    <Icon size={20} />

                  </div>

                  {active && (

                    <div className="
                      text-xs
                      font-medium
                      text-gray-700
                    ">
                      Selected
                    </div>

                  )}

                </div>

                <h2 className="
                  text-lg
                  font-semibold
                  text-gray-900
                  mb-2
                ">
                  {item.title}
                </h2>

                <p className="
                  text-sm
                  text-gray-600
                ">
                  {item.description}
                </p>

              </button>
            );
          })}

        </div>

        <div className="
          bg-gray-200
          rounded-2xl
          border border-gray-300
          overflow-hidden
        ">

          <div className="
            px-6 py-5
            border-b border-gray-300
          ">

            <div className="
              flex items-center gap-3
            ">

              <Database
                size={20}
                className="text-gray-700"
              />

              <div>

                <h2 className="
                  text-lg
                  font-semibold
                  text-gray-900
                ">
                  Upload Source File
                </h2>

                <p className="
                  text-sm
                  text-gray-600
                  mt-1
                ">
                  CSV ingestion and ESG normalization workflow
                </p>

              </div>

            </div>

          </div>

          <div className="p-6">

            <div className="
              border border-dashed
              border-gray-400
              rounded-2xl
              p-10
              text-center
              bg-gray-300
            ">

              <div className="
                flex flex-col
                items-center
              ">

                <div className="
                  bg-gray-700
                  text-white
                  p-4
                  rounded-2xl
                  mb-5
                ">

                  <FileSpreadsheet size={28} />

                </div>

                <h3 className="
                  text-xl
                  font-semibold
                  text-gray-900
                  mb-2
                ">
                  Select CSV File
                </h3>

                <p className="
                  text-gray-600
                  mb-8
                  max-w-lg
                ">
                  Upload source operational data for validation,
                  normalization, and analyst review workflows.
                </p>

                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }
                  className="
                    w-full
                    max-w-lg
                    bg-gray-200
                    border border-gray-400
                    rounded-xl
                    p-4
                    text-gray-700
                  "
                />

                {file && (

                  <div className="
                    mt-5
                    inline-flex
                    items-center gap-2
                    text-sm
                    text-gray-700
                    font-medium
                  ">

                    <CheckCircle2 size={16} />

                    {file.name}

                  </div>

                )}

              </div>

            </div>

            <div className="mt-6">

              <button
                onClick={handleUpload}
                disabled={loading}
                className="
                  w-full
                  bg-gray-700
                  hover:bg-gray-800
                  disabled:bg-gray-400
                  text-white
                  py-4
                  rounded-xl
                  font-medium
                  transition-all
                  flex items-center
                  justify-center gap-3
                "
              >

                {loading ? (

                  <>

                    <Loader2
                      size={20}
                      className="animate-spin"
                    />

                    Processing Upload...

                  </>

                ) : (

                  <>

                    <UploadCloud size={20} />

                    Upload ESG Data

                  </>

                )}

              </button>

              {summary && (

                <div className="
                  mt-4
                  flex items-center
                  gap-3
                  bg-green-500/10
                  border border-green-500/20
                  text-green-800
                  px-4 py-3
                  rounded-xl
                  text-sm
                  font-medium
                ">

                  <CheckCircle2 size={18} />

                  ESG data uploaded successfully

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </StarsBackground>
  );
}