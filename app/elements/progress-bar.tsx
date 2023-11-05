interface ILinearProgressBar {
  percent: number;
  fontSize?: number;
  animateTiming?: number;
}

export default function LinearProgressBar(props) {
  return (
    <div
      className="h-1 rounded-full bg-sky-500"
      style={{ width: props.percent + "%" }}
    />
  );
}
