export function Logo(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="24"
      fill="currentColor"
      viewBox="0 0 240 120"
      {...props}
    >
      <rect width="30" height="30" fill="currentColor" />
      <rect x="30" width="30" height="30" fill="currentColor" />
      <rect x="60" width="30" height="30" fill="currentColor" />
      <rect y="90" width="30" height="30" fill="currentColor" />
      <rect x="30" y="90" width="30" height="30" fill="currentColor" />
      <rect x="60" y="90" width="30" height="30" fill="currentColor" />
      <rect x="30" y="30" width="30" height="30" fill="currentColor" />
      <rect x="120" width="30" height="30" fill="currentColor" />
      <rect x="150" width="30" height="30" fill="currentColor" />
      <rect x="210" y="30" width="30" height="30" fill="currentColor" />
      <rect x="180" width="30" height="30" fill="currentColor" />
      <rect x="120" y="30" width="30" height="30" fill="currentColor" />
      <rect x="120" y="60" width="30" height="30" fill="currentColor" />
      <rect x="120" y="90" width="30" height="30" fill="currentColor" />
      <rect x="150" y="60" width="30" height="30" fill="currentColor" />
      <rect x="210" y="90" width="30" height="30" fill="currentColor" />
      <rect x="180" y="60" width="30" height="30" fill="currentColor" />
      <rect x="30" y="60" width="30" height="30" fill="currentColor" />
    </svg>
  );
}
