import { useEffect, useState } from "react";

const SiteLoader = ({ isVisible, progress }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setShouldRender(false), 520);
    return () => window.clearTimeout(timeoutId);
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`site-loader ${isVisible ? "" : "is-hidden"}`}
      role="status"
      aria-live="polite"
      aria-label="Loading site resources"
    >
      <div className="site-loader__panel">
        <div className="site-loader__mark" aria-hidden="true">
          <span>I</span>
          <span>L</span>
        </div>
        <div className="site-loader__copy">
          <strong>Ivan Lovo</strong>
          <span>Loading 3D portfolio</span>
        </div>
        <div className="site-loader__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(progress, 4) / 100})` }} />
        </div>
        <p>{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default SiteLoader;
