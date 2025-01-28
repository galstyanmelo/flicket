export function adjustGradientOnMouseMove(event, ref) {
  const x = event.clientX - ref.current.getBoundingClientRect().left;
  const y = event.clientY - ref.current.getBoundingClientRect().top;
  ref.current.style.setProperty("--x", `${x}px`);
  ref.current.style.setProperty("--y", `${y}px`);
}
