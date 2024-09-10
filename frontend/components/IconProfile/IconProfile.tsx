import styles from "./IconProfile.module.css";

interface IconProfileProps {
  src?: string;
  name: string;
  surname: string;
  length: "image is-16x16" | "image is-24x24" | "image is-32x32";
}

import React from "react";

export function IconProfile({ src, length, name, surname }: IconProfileProps) {
  return (
    <figure className={length}>
      <img className="is-rounded" src={src} alt={`${name} ${surname}`} />
    </figure>
  );
}
