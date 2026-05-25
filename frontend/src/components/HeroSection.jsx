import DoodleBackground from "./DoodleBackground";

export default function HeroSection() {

  return (

    <div className="
      relative
      h-[220px]
      overflow-hidden
      bg-[#020617]
    ">

      <div className="
        absolute inset-0
        opacity-40
      ">

        <DoodleBackground />

      </div>

      <div className="
        relative z-10
        max-w-7xl
        mx-auto
        px-6
        h-full
        flex
        items-center
      ">

        <div>

          <h1 className="
            text-6xl
            font-semibold
            tracking-tight
            text-white
          ">
            Breathe ESG
          </h1>

          <p className="
            mt-5
            text-lg
            text-slate-400
            max-w-2xl
            leading-relaxed
          ">
            Enterprise ESG ingestion,
            normalization, analyst review,
            and audit workflows.
          </p>

        </div>

      </div>

    </div>
  );
}