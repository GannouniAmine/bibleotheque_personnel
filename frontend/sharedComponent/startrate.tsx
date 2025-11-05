
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRate(props: any) {
  const [hover, setHover] = useState(0);

  function handleClick(rateValue: number) {
    if (!props.editable) return; 
    props.setBookDetail((prev: any) => ({ ...prev, note: rateValue }));
  }

  return (
    <div className="flex space-x-2">
      {[...Array(5)].map((_, index) => {
        const rateValue = index + 1;

        return (
          <label key={rateValue}>
            <FaStar
              size={30}
              className={`transition-colors duration-200 ${props.editable ? "cursor-pointer" : "cursor-default"}`}
              color={rateValue <= (hover || props.bookDetail?.note) ? "#facc15" : "#d1d5db"}
              onClick={() => handleClick(rateValue)}
              onMouseEnter={() => props.editable && setHover(rateValue)}
              onMouseLeave={() => props.editable && setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}
