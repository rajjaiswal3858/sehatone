"use client";

import { useEffect, useState } from "react";
import { displaySequence } from "./data";

interface Props {
  location?: string;
  animate?: boolean;
  start?: number;
  size?: "lg" | "sm";
}

/** Waiting-area display: "now serving" + upcoming tokens. Advances like a real queue. */
export function DisplayScreen({ location = "Waiting area · Ground floor", animate = true, start = 0, size = "lg" }: Props) {
  const [i, setI] = useState(start);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % displaySequence.length);
      if (!reduce) setFlash(true);
    }, 4200);
    return () => window.clearInterval(id);
  }, [animate]);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(false), 900);
    return () => window.clearTimeout(t);
  }, [flash]);

  const at = (k: number) => displaySequence[(i + k) % displaySequence.length];
  const now = at(0);

  return (
    <div className={`screen screen--${size}`} data-nosnippet="">
      <div className="screen__bar">
        <span className="screen__brand">SEHAT<b>ONE</b></span>
        <span>{location}</span>
      </div>
      <div className="screen__body">
        <div className={`screen__now${flash ? " is-flash" : ""}`}>
          <span className="screen__label">Now serving</span>
          <span className="screen__token" key={now.token}>{now.token}</span>
          <span className="screen__room">
            {now.room} <i>·</i> {now.doctor}
          </span>
        </div>
        <ol className="screen__next" aria-label="Up next">
          <li className="screen__label">Up next</li>
          {[1, 2, 3].map((k) => (
            <li key={k}>
              <b>{at(k).token}</b>
              <span>{at(k).room}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
