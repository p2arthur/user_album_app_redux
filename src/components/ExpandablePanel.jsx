import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function ExpandablePanel({ header, children }) {
  const [expanded, setexpanded] = useState(false);

  const handleClick = () => {
    setexpanded(!expanded);
  };

  return (
    <div className="mb-2 border rounded items-center">
      <div className="flex justify-between items-center py-2 px-3 select-none">
        {header}
        <div onClick={handleClick} className="cursor-pointer">
          {expanded ? <GoChevronUp /> : <GoChevronDown />}
        </div>
      </div>

      {expanded && <div className="py-2 px-3 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
