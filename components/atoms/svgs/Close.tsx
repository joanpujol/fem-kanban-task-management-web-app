interface CloseProps {
  className?: string;
}

export const Close = ({ className }: CloseProps) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="12.728"
      width="3"
      height="18"
      transform="rotate(45 12.728 0)"
      fill="currentColor"
    />
    <rect
      y="2.12109"
      width="3"
      height="18"
      transform="rotate(-45 0 2.12109)"
      fill="currentColor"
    />
  </svg>
);
