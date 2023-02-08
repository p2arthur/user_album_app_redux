import classNames from "classnames";

//Building a skeleton loader to show the user we're loading the data

function Skeleton({ times }) {
  const renderedBoxes = Array(times)
    .fill(0)
    .map((_, i) => <div key={i} className="w-full h-3 mb-5 bg-black" />);
  return renderedBoxes;
}

export default Skeleton;
