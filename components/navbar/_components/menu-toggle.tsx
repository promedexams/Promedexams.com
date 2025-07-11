import { forwardRef } from "react";
import { motion, SVGMotionProps } from "framer-motion";

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path strokeWidth="3.91304" stroke="currentColor" strokeLinecap="round" {...props} />
);

const MenuToggle = forwardRef<HTMLButtonElement, { toggle: () => void; isOpen: boolean }>(({ toggle, isOpen }, ref) => (
  <button
    ref={ref}
    onClick={toggle}
    className="z-30 grid h-10 w-10 place-items-center text-[#f1a208] transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none cursor-pointer"
    aria-label="Toggle navigation menu"
  >
    <svg width="30" height="30" viewBox="0 0 30 30">
      <Path
        initial="closed"
        variants={{
          closed: { d: "M 4 6 L 26 6" },
          open: { d: "M 6 24 L 24 6" },
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <Path
        initial="closed"
        d="M 4 15 H 26"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.1 }}
      />
      <Path
        initial="closed"
        variants={{
          closed: { d: "M 4 24 L 26 24" },
          open: { d: "M 6 6 L 24 24" },
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
    </svg>
  </button>
));

MenuToggle.displayName = "MenuToggle";

export default MenuToggle;
