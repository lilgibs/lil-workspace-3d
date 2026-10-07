import type { Product } from "../model/catalog";

export function ProductThumbnail({ product }: { product: Product }) {
  const { category, visualKey } = product;
  return (
    <svg viewBox="0 0 180 130" aria-hidden="true" className="product-thumbnail">
      <ellipse cx="90" cy="113" rx="54" ry="8" fill="#c9cdbb" opacity=".28" />
      {category === "desk" && (
        <g strokeLinejoin="round">
          {visualKey === "compact" ? <g fill="#b68b5c"><path d="M35 58h7v43l-7-3Z" /><path d="M95 85h7v36l-7-3Z" /><path d="M140 64h7v37l-7 4Z" /><path d="M81 33h7v40l-7-4Z" /></g> : <g stroke="#465443" strokeWidth="5" fill="none"><path d="m34 56 0 44 61 29V86m45-23v39l-45 27" /><path d="m81 30 0 46 61 28" /></g>}
          <path d="m29 53 53-29 69 34-54 31Z" fill={visualKey === "compact" ? "#dfb884" : "#c89c69"} />
          <path d="m29 53 68 36v7L29 60Z" fill="#b68b5c" /><path d="m97 89 54-31v7L97 96Z" fill="#a77b4b" />
          <path d="m49 51 66 34m-49-43 66 34" stroke="#b78d5e" opacity=".45" />
        </g>
      )}
      {category === "chair" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path d="M90 89v22m0-4-30 8m30-8 29 11m-29-11 0 15m0-15 25-11" stroke="#485a43" strokeWidth="5" />
          <g fill="#334c39"><circle cx="60" cy="116" r="4" /><circle cx="119" cy="118" r="4" /><circle cx="90" cy="121" r="4" /><circle cx="115" cy="97" r="4" /></g>
          <path d="m63 82 27-15 29 16-28 17-28-13Z" fill="#73916b" />
          <path d={visualKey === "mesh" ? "M69 33q0-9 8-5l33 18q5 3 5 9v30q0 6-5 3L73 67q-4-2-4-7Z" : "M67 26q0-10 9-6l34 19q7 4 7 12v38q0 5-7 2L73 70q-6-4-6-11Z"} fill={visualKey === "mesh" ? "#567754" : "#315944"} />
          {visualKey === "mesh" ? <path d="m76 36 31 17m-31-9 31 17m-31-9 31 17" stroke="#9aaf85" opacity=".65" /> : <g><path d="m84 23 0-9 21 12v9Z" fill="#355943" /><path d="m76 42 29 16m-29-5 29 16" stroke="#658c65" /></g>}
          <path d="M60 77v14m60-11v12m-65-20 20 11m39-12 13 8" stroke="#405740" strokeWidth="5" />
        </g>
      )}
      {category === "monitor" && <g strokeLinejoin="round"><path d="m73 103 21-12 24 14-21 12Z" fill="#6b7568" /><path d="M94 84v18" stroke="#687369" strokeWidth="6" /><path d="m43 27 94 19v59L43 85Z" fill="#2f4139" /><path d="m50 35 79 16v43L50 78Z" fill="#6e8a74" /><path d="m59 49 27 6m-27 4 37 8" stroke="#cfddbb" strokeWidth="2" strokeLinecap="round" /></g>}
      {category === "lamp" && <g strokeLinecap="round"><ellipse cx="91" cy="106" rx="26" ry="10" fill="#5b7458" /><path d="M92 102V65l-17-27" stroke="#446648" strokeWidth="6" fill="none" /><circle cx="92" cy="65" r="5" fill="#8da77a" /><path d="m68 31 15 7 14 23q-20 13-42 0Z" fill="#567751" /><ellipse cx="76" cy="61" rx="21" ry="7" fill="#e9ddb6" /></g>}
      {category === "plant" && <g><path d="m67 84 8 30q15 11 30 0l8-30Z" fill="#b7795b" /><ellipse cx="90" cy="84" rx="23" ry="12" fill="#d39771" /><ellipse cx="90" cy="84" rx="18" ry="8" fill="#756047" /><path d="M90 85V32m0 32L71 48m19 25 22-27" stroke="#577243" strokeWidth="3" /><path d="M90 52Q62 32 81 15q25 12 9 37Z" fill="#6a8955" /><path d="M80 65Q49 68 52 39q27-3 28 26Z" fill="#89a16b" /><path d="M94 63q-3-34 29-32 0 28-29 32Z" fill="#46734a" /><path d="M93 79q12-26 35-15-9 27-35 15Z" fill="#71935c" /></g>}
    </svg>
  );
}
