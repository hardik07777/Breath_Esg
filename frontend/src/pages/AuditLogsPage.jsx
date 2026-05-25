import { useEffect, useState } from "react";

import api from "../api/client";

import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock3,
  History,
  User,
} from "lucide-react";
import { StarsBackground } from "../components/StarsBackground";

function AuditLogsPage() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {

    try {

      const response = await api.get(
        "audit-logs/"
      );

      setLogs(response.data);

    } catch (error) {

      console.error(error);
    }
  };

  const approvedCount = logs.filter(
    log => log.action === "APPROVED"
  ).length;

  const rejectedCount = logs.filter(
    log => log.action === "REJECTED"
  ).length;

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

      <div className="max-w-7xl mx-auto">

        <div className="
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-6
          mb-8
        ">

          <div>

            <div className="
              flex items-center gap-3
              mb-2
            ">

              <div className="
                bg-gray-700
                text-white
                p-3
                rounded-2xl
                -mt-2
              ">

                <ShieldCheck size={28} />

              </div>

              <div>

                <h1 className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-gray-100
                ">
                  Audit Trail
                </h1>

                <p className="
                  text-gray-300
                  mt-1
                ">
                  Governance and analyst review history
                </p>

              </div>

            </div>

          </div>

          <div className="
            flex flex-wrap
            gap-3
          ">

            <div className="
              bg-gray-200
              rounded-2xl
              border border-gray-300
              px-5 py-4
              min-w-[160px]
            ">

              <div className="
                text-sm
                text-gray-600
                mb-2
              ">
                Total Events
              </div>

              <div className="
                text-3xl
                font-semibold
                text-gray-900
              ">
                {logs.length}
              </div>

            </div>

            <div className="
              bg-gray-200
              rounded-2xl
              border border-gray-300
              px-5 py-4
              min-w-[160px]
            ">

              <div className="
                text-sm
                text-gray-600
                mb-2
              ">
                Approved
              </div>

              <div className="
                text-3xl
                font-semibold
                text-gray-900
              ">
                {approvedCount}
              </div>

            </div>

            <div className="
              bg-gray-200
              rounded-2xl
              border border-gray-300
              px-5 py-4
              min-w-[160px]
            ">

              <div className="
                text-sm
                text-gray-600
                mb-2
              ">
                Rejected
              </div>

              <div className="
                text-3xl
                font-semibold
                text-gray-900
              ">
                {rejectedCount}
              </div>

            </div>

          </div>

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

              <History
                size={20}
                className="text-gray-700"
              />

              <div>

                <h2 className="
                  text-lg
                  font-semibold
                  text-gray-900
                ">
                  Audit Events
                </h2>

                <p className="
                  text-sm
                  text-gray-600
                  mt-1
                ">
                  Immutable analyst approval history
                </p>

              </div>

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
                    Action
                  </th>

                  <th className="text-left px-6 py-4">
                    Entity
                  </th>

                  <th className="text-left px-6 py-4">
                    Previous
                  </th>

                  <th className="text-left px-6 py-4">
                    New
                  </th>

                  <th className="text-left px-6 py-4">
                    Actor
                  </th>

                  <th className="text-left px-6 py-4">
                    Timestamp
                  </th>

                </tr>

              </thead>

              <tbody>

                {logs.map((log) => (

                  <tr
                    key={log.id}
                    className="
                      border-b border-gray-300
                      hover:bg-gray-300
                      transition-colors
                    "
                  >

                    <td className="px-6 py-5">

                      {log.action === "APPROVED" && (

                        <div className="
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-medium
                          text-gray-700
                        ">

                          <CheckCircle2 size={16} />

                          Approved

                        </div>

                      )}

                      {log.action === "REJECTED" && (

                        <div className="
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-medium
                          text-gray-700
                        ">

                          <XCircle size={16} />

                          Rejected

                        </div>

                      )}

                    </td>

                    <td className="px-6 py-5">

                      <div className="
                        font-medium
                        text-gray-900
                      ">
                        {log.entity_type}
                      </div>

                      <div className="
                        text-sm
                        text-gray-600
                        mt-1
                      ">
                        Record #{log.entity_id}
                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <span className="
                        inline-flex
                        items-center
                        px-3 py-1
                        rounded-md
                        bg-gray-300
                        text-gray-700
                        text-xs
                        font-medium
                      ">

                        {log.previous_value?.review_status || "-"}

                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span className="
                        inline-flex
                        items-center
                        px-3 py-1
                        rounded-md
                        bg-gray-300
                        text-gray-700
                        text-xs
                        font-medium
                      ">

                        {log.new_value?.review_status || "-"}

                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <div className="
                        flex items-center gap-2
                        text-sm
                        text-gray-700
                      ">

                        <User size={15} />

                        {log.actor}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="
                        flex items-center gap-2
                        text-sm
                        text-gray-600
                      ">

                        <Clock3 size={15} />

                        {new Date(
                          log.timestamp
                        ).toLocaleString()}

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {logs.length === 0 && (

            <div className="
              py-24
              flex flex-col
              items-center
              justify-center
              text-center
            ">

              <div className="
                bg-gray-300
                p-4
                rounded-2xl
                mb-4
              ">

                <ShieldCheck
                  size={40}
                  className="text-gray-600"
                />

              </div>

              <h3 className="
                text-xl
                font-semibold
                text-gray-900
                mb-2
              ">
                No Audit Events
              </h3>

              <p className="
                text-gray-600
                max-w-md
              ">
                Approve or reject records to generate audit history.
              </p>

            </div>

          )}

        </div>

      </div>

    </StarsBackground>
  );
}

export default AuditLogsPage;
