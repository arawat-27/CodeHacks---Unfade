import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const ripples = [
  ["-8%", "9%", "33%", "12s"],
  ["21%", "24%", "43%", "17s"],
  ["68%", "35%", "30%", "15s"],
  ["32%", "55%", "36%", "19s"],
  ["-11%", "74%", "46%", "16s"],
  ["72%", "84%", "36%", "21s"],
];

function Crow({ side }) {
  return (
    <div className={`landing-crow ${side}`} aria-hidden="true">
      <svg viewBox="0 0 160 90">
        <path
          className="landing-wing wing-left"
          d="M78 51C47 45 18 29 5 13c27 4 51 11 76 30z"
        />
        <path
          className="landing-wing wing-right"
          d="M83 52c24-19 48-29 73-31-14 20-39 33-67 36z"
        />
        <ellipse cx="82" cy="55" rx="18" ry="10" transform="rotate(9 82 55)" />
        <circle cx="100" cy="49" r="7" />
        <path d="M106 49l17 3-16 4z" />
      </svg>
    </div>
  );
}

function Cloud({ name }) {
  return (
    <div className={`landing-cloud ${name}`} aria-hidden="true">
      <i className="cloud-base" />
      <i className="cloud-puff puff-one" />
      <i className="cloud-puff puff-two" />
    </div>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);
  const enterSite = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(
      () => navigate("/Home"),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 80 : 860
    );
  };

  return (
    <main
      className={`landing-scene ${leaving ? "is-leaving" : ""}`}
      aria-label="Unfade opening scene"
    >
      <div className="landing-sky" aria-hidden="true" />
      <div className="landing-ocean" aria-hidden="true">
        <div className="landing-horizon" />
        <div className="landing-band band-one" />
        <div className="landing-band band-two" />
        <div className="landing-band band-three" />
        {ripples.map(([left, top, width, duration], index) => (
          <div
            className="landing-ripple"
            key={index}
            style={{ left, top, width, "--wave-duration": duration }}
          />
        ))}
        <div className="landing-reflection">
          <i />
          <i />
          <i />
        </div>
      </div>
      <Cloud name="cloud-one" />
      <Cloud name="cloud-two" />
      <Cloud name="cloud-three" />
      <Cloud name="cloud-four" />
      <Crow side="crow-left" />
      <Crow side="crow-right" />
      <div className="landing-sun">
        <i className="landing-ring ring-four" />
        <i className="landing-ring ring-three" />
        <i className="landing-ring ring-two" />
        <i className="landing-ring ring-one" />
        <button
          className="landing-enter"
          type="button"
          onClick={enterSite}
          aria-label="Enter Unfade"
        >
          unfade
        </button>
      </div>
      <div className="landing-transition" aria-hidden="true" />
    </main>
  );
}

export default Landing;
