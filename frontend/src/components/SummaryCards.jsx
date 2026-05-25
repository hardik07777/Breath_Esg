import {
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

function SummaryCards({ records }) {

  const total = records.length;

  const approved = records.filter(
    r => r.review_status === "APPROVED"
  ).length;

  const rejected = records.filter(
    r => r.review_status === "REJECTED"
  ).length;

  const pending = records.filter(
    r => r.review_status === "PENDING"
  ).length;

  const cards = [
    {
      title: "Total Records",
      value: total,
      icon: Database,
      subtitle: "All ingested activities",
    },
    {
      title: "Approved",
      value: approved,
      icon: CheckCircle2,
      subtitle: "Validated by analysts",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      subtitle: "Rejected during review",
    },
    {
      title: "Pending",
      value: pending,
      icon: AlertTriangle,
      subtitle: "Awaiting approval",
    },
  ];

  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-3
    ">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="
              bg-gray-200
              border border-gray-300
              rounded-2xl
              p-5
              transition-all
              hover:border-gray-400
            "
          >

            <div className="
              flex items-start
              justify-between
              mb-6
            ">

              <div>

                <p className="
                  text-sm
                  font-medium
                  text-gray-600
                ">
                  {card.title}
                </p>

                <h2 className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-gray-900
                  mt-3
                ">
                  {card.value}
                </h2>

              </div>

              <div className="
                bg-gray-300
                text-gray-700
                p-3
                rounded-xl
              ">

                <Icon size={20} />

              </div>

            </div>

            <p className="
              text-sm
              text-gray-600
            ">
              {card.subtitle}
            </p>

          </div>
        );
      })}

    </div>
  );
}

export default SummaryCards;