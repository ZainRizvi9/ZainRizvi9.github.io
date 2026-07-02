import { useState } from "react";

export default function PhotoBlock({ src, alt = "", className = "", style = {} }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background:
            "linear-gradient(155deg, var(--ink-2), var(--ink))",
          position: "relative",
          overflow: "hidden",
        }}
        role="img"
        aria-label={alt}
      >
        <div className="contour-field" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
