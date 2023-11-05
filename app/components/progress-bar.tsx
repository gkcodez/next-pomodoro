interface ILinearProgressBar {
  percent: number;
  fontSize?: number;
  animateTiming?: number;
}

const LinearProgressBar: React.FC<ILinearProgressBar> = (props) => {
  return (
    <div
      className="bg-sky-500 h-1 rounded-full"
      style={{ width: props.percent + "%" }}
    />
  );
};

export default LinearProgressBar;