import React from "react";
import { site } from "../content";

/**
 * Infinite role ticker. The track holds two identical copies of the list so
 * translating it -50% loops seamlessly.
 */
function Marquee() {
  const copies = [...site.roles, ...site.roles];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {copies.map((role, i) => (
          <span className="marquee-item" key={`${role}-${i}`}>
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
