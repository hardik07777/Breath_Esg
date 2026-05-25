import React from "react";

import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function generateStars(count, starColor) {

  const shadows = [];

  for (let i = 0; i < count; i++) {

    const x =
      Math.floor(Math.random() * 4000) - 2000;

    const y =
      Math.floor(Math.random() * 4000) - 2000;

    shadows.push(
      `${x}px ${y}px ${starColor}`
    );
  }

  return shadows.join(", ");
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = {
    repeat: Infinity,
    duration: 50,
    ease: "linear",
  },
  starColor = "#fff",
  className,
  ...props
}) {

  const [boxShadow, setBoxShadow] =
    React.useState("");

  React.useEffect(() => {

    setBoxShadow(
      generateStars(count, starColor)
    );

  }, [count, starColor]);

  return (

    <motion.div
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn(
        "absolute top-0 left-0 w-full h-[2000px]",
        className
      )}
      {...props}
    >

      <div
        className="
          absolute
          bg-transparent
          rounded-full
        "
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />

      <div
        className="
          absolute
          bg-transparent
          rounded-full
          top-[2000px]
        "
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />

    </motion.div>
  );
}

export function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 120,
  transition = {
    stiffness: 50,
    damping: 20,
  },
  starColor = "rgba(255,255,255,1)",
  ...props
}) {

  const offsetX = useMotionValue(1);

  const offsetY = useMotionValue(1);

  const springX = useSpring(
    offsetX,
    transition
  );

  const springY = useSpring(
    offsetY,
    transition
  );

  const handleMouseMove =
    React.useCallback((e) => {

      const centerX =
        window.innerWidth / 2;

      const centerY =
        window.innerHeight / 2;

      const newOffsetX =
        -(e.clientX - centerX) * factor;

      const newOffsetY =
        -(e.clientY - centerY) * factor;

      offsetX.set(newOffsetX);

      offsetY.set(newOffsetY);

    }, [offsetX, offsetY, factor]);

  return (

    <div
      className={cn(
        `
          relative
          min-h-screen
          overflow-hidden
          bg-[#020617]
        `,
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >

      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
      >

        <StarLayer
  count={700}
  size={6}
  transition={{
    repeat: Infinity,
    duration: speed,
    ease: "linear",
  }}
  starColor={starColor}
/>

<StarLayer
  count={300}
  size={10}
  transition={{
    repeat: Infinity,
    duration: speed * 2,
    ease: "linear",
  }}
  starColor={starColor}
/>

<StarLayer
  count={120}
  size={14}
  transition={{
    repeat: Infinity,
    duration: speed * 3,
    ease: "linear",
  }}
  starColor={starColor}
/>

      </motion.div>

      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}