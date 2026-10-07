// Original SVG illustration for Lil Workspace · Khalil Gibran Hadi.
export function WorkspacePoster() {
  return (
    <svg className="workspace-poster" viewBox="0 0 720 650" role="img" aria-labelledby="workspace-poster-title workspace-poster-description">
      <title id="workspace-poster-title">A little room for your next big idea</title>
      <desc id="workspace-poster-description">An isometric workspace with a warm wooden desk, a green office chair, a monitor, a task lamp, and a potted plant, framed by softly lit walls.</desc>
      <defs>
        <linearGradient id="poster-wall-left" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e2e9dc" /><stop offset="1" stopColor="#cdd9ca" /></linearGradient>
        <linearGradient id="poster-wall-right" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f4eee2" /><stop offset="1" stopColor="#e9e0ce" /></linearGradient>
        <linearGradient id="poster-floor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f3eee3" /><stop offset="1" stopColor="#ded3bd" /></linearGradient>
        <linearGradient id="poster-wood" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e5bc87" /><stop offset="1" stopColor="#c9955d" /></linearGradient>
        <linearGradient id="poster-screen" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#416758" /><stop offset="1" stopColor="#243e36" /></linearGradient>
        <linearGradient id="poster-chair" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5d7b61" /><stop offset="1" stopColor="#345943" /></linearGradient>
        <filter id="poster-shadow" x="-30%" y="-40%" width="160%" height="180%"><feGaussianBlur stdDeviation="13" /></filter>
        <clipPath id="poster-floor-clip"><path d="m80 416 287-165 289 167-287 166Z" /></clipPath>
      </defs>
      <ellipse cx="370" cy="575" rx="248" ry="33" fill="#bfb9a8" opacity=".23" filter="url(#poster-shadow)" />
      {/* An open room, with a timber floor and soft morning light. */}
      <path d="m80 416 287-165 289 167v18L369 602 80 434Z" fill="#c9bda6" />
      <path d="m80 416 287-165 289 167-287 166Z" fill="url(#poster-floor)" />
      <g clipPath="url(#poster-floor-clip)" stroke="#c7b99f" strokeWidth="1" opacity=".4">
        <path d="m30 401 390 225m-320-265 390 225m-320-265 390 225m-320-265 390 225m-320-265 390 225" />
        <path d="m127 491 368-211m-260 275 369-212m-260 275 369-212" />
      </g>
      <path d="M80 416V174L367 9v242Z" fill="url(#poster-wall-left)" />
      <path d="M367 9 656 176v242L367 251Z" fill="url(#poster-wall-right)" />
      <path d="M80 416V174L367 9l289 167v242" fill="none" stroke="#c4cbbd" strokeWidth="2" />
      <path d="M367 9v242" stroke="#c6cbbd" strokeWidth="2" />
      <path d="m80 407 287-165 289 167" stroke="#faf6eb" strokeWidth="7" fill="none" />
      <path d="m113 205 95-55v116l-95 55Z" fill="#fbf5dc" opacity=".68" />
      <path d="m160 178 0 116m-47-31 95-55" stroke="#d8dcc5" strokeWidth="5" />
      <path d="m113 320 95-55 73 100-93 55Z" fill="#fff7df" opacity=".25" />
      <path d="m511 138 76 44v99l-76-44Z" fill="#b89b76" />
      <path d="m517 148 64 37v86l-64-37Z" fill="#f8f1e4" />
      <path d="m530 222 0-28q23-24 37 21v29Z" fill="#b8c5a2" />
      <path d="m544 230 0-29q9-9 15 9v29Z" fill="#52745a" />
      <path d="m522 233 55 32" stroke="#cfb991" strokeWidth="1.5" />
      <ellipse cx="375" cy="448" rx="168" ry="55" transform="rotate(12 375 448)" fill="#706b4e" opacity=".12" filter="url(#poster-shadow)" />
      {/* Four legs and a solid wood desktop. */}
      <path d="m341 211 12 7v135l-12-7Z" fill="#8b684b" />
      <path d="m353 218 7-4v135l-7 4Z" fill="#ad8257" />
      <path d="m550 337 12 7v135l-12-7Z" fill="#8b684b" />
      <path d="m562 344 7-4v135l-7 4Z" fill="#b68b5e" />
      <path d="m186 305 12 7v135l-12-7Z" fill="#936d49" />
      <path d="m198 312 7-4v135l-7 4Z" fill="#bd925f" />
      <path d="m389 421 12 7v135l-12-7Z" fill="#966f4b" />
      <path d="m401 428 7-4v135l-7 4Z" fill="#ba8d59" />
      <path d="m179 291 169-97 222 127-169 98Z" fill="url(#poster-wood)" />
      <path d="m179 291 222 128v13L179 304Z" fill="#bd8b56" />
      <path d="m401 419 169-98v13l-169 98Z" fill="#a97b4d" />
      <g stroke="#b58957" strokeWidth="1.2" opacity=".32" fill="none">
        <path d="m195 288 209 120m-183-135 209 120m-183-135 209 120m-183-135 209 120m-183-135 209 120m-183-135 209 120" />
        <path d="m238 278 40 23q13 11 30 17l29 17m26-32 49 29q17 6 32 19" />
      </g>
      {/* Task lamp. */}
      <ellipse cx="269" cy="262" rx="23" ry="12" fill="#b18c54" opacity=".25" />
      <path d="m250 256 17-10 25 14-17 10Z" fill="#3c5343" />
      <path d="M271 253v-47l-20-27" stroke="#345542" strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="271" cy="206" r="5" fill="#789274" />
      <path d="m244 172 13 7 10 20q-17 10-35-2Z" fill="#45634e" />
      <ellipse cx="249" cy="197" rx="17" ry="6" transform="rotate(7 249 197)" fill="#eadfba" />
      {/* Monitor and an abstract desktop interface. */}
      <path d="m345 305 23-13 35 20-23 14Z" fill="#4b514b" />
      <path d="m370 280 9 5v28l-9-5Z" fill="#687069" />
      <path d="m307 145 132 76v94l-132-76Z" fill="#202f2b" stroke="#202f2b" strokeWidth="6" strokeLinejoin="round" />
      <path d="m316 159 114 66v74l-114-66Z" fill="url(#poster-screen)" />
      <path d="m327 183 22 13m-22-5 34 20m-34-11 24 14" stroke="#a8c8a6" strokeWidth="2" strokeLinecap="round" opacity=".8" />
      <path d="m384 239 28 16v24l-28-16Z" fill="#7a9b76" opacity=".5" />
      <path d="m388 256 5-4 6 8 9-5" stroke="#c9dcad" strokeWidth="2" fill="none" />
      <circle cx="373" cy="278" r="1.8" fill="#89938a" />
      {/* Keyboard, mouse, and coffee. */}
      <path d="m292 323 27-16 80 46-27 16Z" fill="#b49b7b" />
      <path d="m292 319 27-16 80 46-27 16Z" fill="#eee9db" />
      <g stroke="#c3c3b3" strokeWidth="2.5" strokeDasharray="4 3"><path d="m308 317 64 37m-71-32 64 37" /></g>
      <path d="m318 341 26 15" stroke="#c2c2b3" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="424" cy="376" rx="10" ry="16" transform="rotate(-58 424 376)" fill="#b49b7b" />
      <ellipse cx="424" cy="373" rx="9" ry="15" transform="rotate(-58 424 373)" fill="#ece7da" />
      <path d="M236 289v14q12 12 24 0v-14" fill="#f5eedc" />
      <ellipse cx="248" cy="289" rx="12" ry="6.5" fill="#fff9ec" />
      <ellipse cx="248" cy="289" rx="8" ry="4" fill="#785e40" />
      <path d="M260 292q12 0 9 9-3 5-9 0" stroke="#f5eedc" strokeWidth="4" fill="none" />
      {/* Desk plant. */}
      <ellipse cx="495" cy="340" rx="24" ry="13" fill="#ac8556" opacity=".22" />
      <path d="m478 318 6 31q11 10 23 0l5-31Z" fill="#ba7658" />
      <ellipse cx="495" cy="318" rx="17" ry="9" fill="#d39370" />
      <ellipse cx="495" cy="318" rx="13" ry="6" fill="#695841" />
      <path d="M495 319v-49m0 34-17-25m17 16 20-26" stroke="#526a3e" strokeWidth="3" fill="none" />
      <path d="M495 287q-19-23-5-42 21 16 5 42Z" fill="#688452" />
      <path d="M487 298q-26 1-26-24 23-2 26 24Z" fill="#78935c" />
      <path d="M501 295q-3-29 23-36 7 26-23 36Z" fill="#446b46" />
      <path d="M498 310q9-23 29-16-4 25-29 16Z" fill="#709357" />
      {/* Upholstered green chair, arms, and five-star base. */}
      <ellipse cx="303" cy="535" rx="69" ry="23" fill="#706b4e" opacity=".17" filter="url(#poster-shadow)" />
      <path d="M303 490v40" stroke="#555e52" strokeWidth="9" />
      <g stroke="#4c584b" strokeWidth="7" strokeLinecap="round"><path d="m303 527-52 12m52-12 46 24m-46-24 2 32m-2-32-31-18m31 18 41-17" /></g>
      <g fill="#35463a"><ellipse cx="251" cy="541" rx="7" ry="9" /><ellipse cx="349" cy="553" rx="7" ry="9" /><ellipse cx="305" cy="561" rx="7" ry="8" /><ellipse cx="272" cy="511" rx="6" ry="8" /><ellipse cx="344" cy="512" rx="6" ry="8" /></g>
      <path d="m251 469 54-31 57 32-54 33q-31 5-57-20Z" fill="#355a42" />
      <path d="m251 460 54-31 57 32-54 33q-31 5-57-20Z" fill="#6d8968" />
      <path d="M264 456v-76q0-20 18-14l57 33q13 8 13 24v61l-21 11-58-32Z" fill="#294c38" />
      <path d="M251 446v-76q0-21 18-13l57 32q13 8 13 24v71q-1 10-13 5l-58-33q-17-8-17-10Z" fill="url(#poster-chair)" />
      <path d="m267 370 54 31m-54-19 54 31m-54-19 54 31m-54-19 54 31m-54-19 54 31" stroke="#86a17d" strokeWidth="1.4" opacity=".38" />
      <path d="M241 445v30m111-28v32" stroke="#465843" strokeWidth="5" />
      <path d="m230 438 27 15m84-17 28 16" stroke="#314b39" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}
