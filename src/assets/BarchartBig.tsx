import { SVGProps } from "react";

export function BarchartBig (props: SVGProps<SVGSVGElement>){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M3 3v18h18" />
        <rect width="4" height="7" x="7" y="10" rx="1" />
        <rect width="4" height="12" x="15" y="5" rx="1" />
      </g>
    </svg>
  );
}