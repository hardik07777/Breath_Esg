import { useEffect } from "react";

import "css-doodle";

export default function DoodleBackground() {

  useEffect(() => {

    const doodle =
      document.querySelector("#hero-doodle");

    if (doodle && doodle.update) {
      doodle.update();
    }

  }, []);

  return (

    <css-doodle id="hero-doodle">
      {`
        :doodle {
          @grid: 30 / 100%;
          background: #d1d5db;
        }

        background: @p(
         rgba(80,80,80,0.08),
         rgba(100,100,100,0.12),
         rgba(60,60,60,0.06)
       );

        transform:
          scale(@r(.5, 1.8))
          rotate(@r(360deg));

        border-radius: 50%;

        animation: move 8s linear infinite;

        @keyframes move {
          0% {
            transform:
              translateY(0px)
              rotate(0deg);
          }

          100% {
            transform:
              translateY(-20px)
              rotate(360deg);
          }
        }
      `}
    </css-doodle>
  );
}