import { SVGProps } from "react";

export function IconBubble(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="54"
      fill="none"
      viewBox="0 0 54 54"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2.813 15.75a8.438 8.438 0 1116.875 0 8.438 8.438 0 01-16.875 0zM7.313 40.5c0-5.903 4.785-10.688 10.687-10.688 5.902 0 10.688 4.785 10.688 10.688 0 5.903-4.785 10.688-10.688 10.688-5.902 0-10.688-4.785-10.688-10.688zM25.313 15.75c0-7.145 5.792-12.938 12.937-12.938S51.188 8.605 51.188 15.75c0 7.145-5.793 12.938-12.938 12.938-7.145 0-12.938-5.793-12.938-12.938z"
      ></path>
    </svg>
  );
}
