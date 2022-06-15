import { useLocation } from "react-router-dom";
import { thisMonth } from "util/constants";
import { titleType } from "./LinkButton";

const Title = ({ title }: titleType) => {
  const pathname = useLocation().pathname;
  return (
    <h1>
      {pathname === "/" ||
      pathname.includes("profile") ||
      pathname.includes("history")
        ? null
        : `${thisMonth}월`}
      {title}
    </h1>
  );
};

export default Title;
