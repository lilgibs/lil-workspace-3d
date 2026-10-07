import { BRANDING } from "@/shared/config/branding";

export function CreatorSignature() {
  return (
      <div className="creator-credit">
        <svg className="creator-mark" viewBox="0 0 74 74" aria-hidden="true">
          <circle cx="37" cy="37" r="37" fill="#303164" />
          <circle cx="37" cy="37" r="34" fill="none" stroke="#7dd4dc" strokeWidth="2" />
          <g fill="#dcf8fa">
            <path d="M21 17h4v14h7v4H21zm14 0h4v18h-4zm8 0h4v14h7v4H43z" />
            <path d="M32 44a9 9 0 1 0 0 13v-8H22v4h6v2a5 5 0 1 1-1-8zm4-5h4v19h-4zm8 0h8c8 0 9 8 4 10 6 3 4 9-3 9h-9zm4 4v4h4c3 0 3-4 0-4zm0 8v4h5c3 0 3-4 0-4z" />
          </g>
        </svg>
        <span>{BRANDING.creatorCredit}</span>
      </div>
  );
}

export function CreatorCredit() {
  return <footer className="site-footer"><CreatorSignature /></footer>;
}
