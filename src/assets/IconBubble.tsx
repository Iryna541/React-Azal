import { SVGProps } from "react";

export function IconBubble(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="#fff"
        d="M1.041 5.832a3.125 3.125 0 116.25 0 3.125 3.125 0 01-6.25 0zM2.707 15a3.958 3.958 0 117.917 0 3.958 3.958 0 01-7.917 0z"
      ></path>
      <path
        fill="#fff"
        d="M9.375 5.833a4.792 4.792 0 119.583 0 4.792 4.792 0 01-9.583 0z"
        opacity="0.4"
      ></path>
    </svg>
  );
}
