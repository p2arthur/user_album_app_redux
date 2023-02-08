import classNames from "classnames";

//Building a skeleton loader to show the user we're loading the data

function Skeleton({ times, className }) {
  //--------------------------------------------------------------------------
  //Creating a constant for the outer box classes
  const outerBoxClasses = classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    className
  );

  //Creating a constant for the inner box classes
  const innerBoxClasses = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );
  //--------------------------------------------------------------------------

  const renderedBoxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outerBoxClasses}>
        <div className={innerBoxClasses}></div>
      </div>
    ));
  return renderedBoxes;
}
//--------------------------------------------------------------------------
export default Skeleton;
