import { useEffect, useState } from "react";

import api from "../api/client";

import SummaryCards from "./SummaryCards";

import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  ShieldAlert,
} from "lucide-react";

function ActivityTable() {

  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {

    try {

      const response = await api.get(
        "activity-records/"
      );

      setRecords(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const approveRecord = async (id) => {

    try {

      await api.post(
        `activity-records/${id}/approve/`
      );

      fetchRecords();

    } catch (error) {

      console.error(error);
    }
  };

  const rejectRecord = async (id) => {

    try {

      await api.post(
        `activity-records/${id}/reject/`
      );

      fetchRecords();

    } catch (error) {

      console.error(error);
    }
  };

  const openRecord = async (id) => {

    try {

      const response = await api.get(
        `activity-records/${id}/`
      );

      setSelectedRecord(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const filteredRecords = records.filter((record) => {

    if (filter === "ALL") {
      return true;
    }

    if (filter === "HAS_ISSUES") {
      return record.issues.length > 0;
    }

    return record.review_status === filter;
  });

  const filterButtons = [
    {
      label: "All",
      value: "ALL",
    },
    {
      label: "Approved",
      value: "APPROVED",
    },
    {
      label: "Rejected",
      value: "REJECTED",
    },
    {
      label: "Pending",
      value: "PENDING",
    },
    {
      label: "Issues",
      value: "HAS_ISSUES",
    },
  ];

  return (

    <div>

      <SummaryCards records={records} />

      <div className="mt-8 mb-5 flex flex-wrap gap-2">

        {filterButtons.map((item) => (

          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium border transition-all
              ${
                filter === item.value
                  ? "bg-gray-700 text-white border-gray-700"
                  : "bg-gray-200 text-gray-700 border-gray-300 hover:border-gray-500"
              }
            `}
          >
            {item.label}
          </button>
        ))}

      </div>

      <div className="
        bg-gray-200
        rounded-2xl
        border border-gray-300
        overflow-hidden
      ">

        <div className="
          flex items-center justify-between
          px-6 py-4
          border-b border-gray-300
        ">

          <div>

            <h2 className="
              text-lg
              font-semibold
              text-gray-900
            ">
              ESG Activity Review Queue
            </h2>

            <p className="
              text-sm
              text-gray-600
              mt-1
            ">
              Review and validate uploaded ESG activity records
            </p>

          </div>

          <div className="
            text-sm
            text-gray-600
          ">
            {filteredRecords.length} records
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="
              bg-gray-200
              border-b border-gray-300
            ">

              <tr className="
                text-xs
                uppercase
                tracking-wide
                text-gray-600
              ">

                <th className="text-left px-6 py-4">
                  Record
                </th>

                <th className="text-left px-6 py-4">
                  Category
                </th>

                <th className="text-left px-6 py-4">
                  Scope
                </th>

                <th className="text-left px-6 py-4">
                  Activity
                </th>

                <th className="text-left px-6 py-4">
                  Quantity
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Validation
                </th>

                <th className="text-left px-6 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredRecords.map((record) => (

                <tr
                  key={record.id}
                  className="
                    border-b border-gray-300
                    hover:bg-gray-300
                    transition-colors
                  "
                >

                  <td className="
                    px-5 py-4
                    font-medium
                    text-gray-900
                  ">
                    #{record.id}
                  </td>

                  <td className="
                    px-6 py-4
                    text-gray-800
                  ">
                    {record.category}
                  </td>

                  <td className="px-6 py-4">

                    <span className="
                      inline-flex items-center
                      px-3 py-1
                      rounded-md
                      bg-gray-300
                      text-gray-700
                      text-xs
                      font-medium
                    ">
                      {record.scope}
                    </span>

                  </td>

                  <td className="
                    px-6 py-4
                    text-gray-700
                  ">
                    {record.activity_type}
                  </td>

                  <td className="
                    px-6 py-4
                    font-medium
                    text-gray-900
                  ">
                    {record.quantity}
                  </td>

                  <td className="px-6 py-4">

                    <div className="
                      flex items-center gap-2
                      text-gray-700
                      text-sm
                      font-medium
                    ">
                      {record.review_status === "APPROVED" && (
                        <>
                          <CheckCircle2 size={16} />
                          Approved
                        </>
                      )}

                      {record.review_status === "REJECTED" && (
                        <>
                          <XCircle size={16} />
                          Rejected
                        </>
                      )}

                      {record.review_status === "PENDING" && (
                        <>
                          <AlertTriangle size={16} />
                          Pending
                        </>
                      )}
                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="
                      flex items-center gap-2
                      text-gray-700
                      text-sm
                      font-medium
                    ">

                      {record.issues.length > 0 ? (
                        <>
                          <ShieldAlert size={16} />
                          {record.issues.length} Issues
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} />
                          Clean
                        </>
                      )}

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      <button
                        className="
                          bg-gray-700
                          hover:bg-gray-800
                          text-white
                          px-4 py-2
                          rounded-lg
                          text-sm
                          font-medium
                          transition-all
                        "
                        onClick={(e) => {
                          e.stopPropagation();
                          approveRecord(record.id);
                        }}
                      >
                        Approve
                      </button>

                      <button
                        className="
                          bg-gray-200
                          hover:bg-gray-300
                          border border-gray-400
                          text-gray-700
                          px-4 py-2
                          rounded-lg
                          text-sm
                          font-medium
                          transition-all
                        "
                        onClick={(e) => {
                          e.stopPropagation();
                          rejectRecord(record.id);
                        }}
                      >
                        Reject
                      </button>

                      <button
                        className="
                          bg-gray-200
                          hover:bg-gray-300
                          border border-gray-400
                          text-gray-700
                          p-2 rounded-lg
                        "
                        onClick={(e) => {
                          e.stopPropagation();
                          openRecord(record.id);
                        }}
                      >
                        <Eye size={16} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {selectedRecord && (

        <div className="
          fixed inset-0
          bg-black/40
          backdrop-blur-sm
          flex items-center justify-center
          z-50
          p-4
        ">

          <div className="
            w-full
            max-w-3xl
            bg-gray-200
            border border-gray-300
            rounded-2xl
            overflow-hidden
          ">

            <div className="
              flex items-center justify-between
              px-6 py-4
              border-b border-gray-300
            ">

              <div>

                <h2 className="
                  text-xl
                  font-semibold
                  text-gray-900
                ">
                  Raw Record Data
                </h2>

                <p className="
                  text-sm
                  text-gray-600
                  mt-1
                ">
                  Uploaded ESG payload details
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedRecord(null)
                }
                className="
                  text-sm
                  text-gray-700
                  hover:text-black
                "
              >
                Close
              </button>

            </div>

            <div className="
              p-6
              max-h-[70vh]
              overflow-y-auto
            ">

              <pre className="
                bg-gray-300
                border border-gray-400
                rounded-xl
                p-5
                text-sm
                text-gray-800
                overflow-x-auto
                whitespace-pre-wrap
              ">
                {JSON.stringify(
                  selectedRecord,
                  null,
                  2
                )}
              </pre>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ActivityTable;