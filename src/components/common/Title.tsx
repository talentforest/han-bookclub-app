import { useLocation } from "react-router-dom";
import { titleType } from "./LinkButton";

const Title = ({ title }: titleType) => {
  const pathname = useLocation().pathname;
  const month = new Date().getMonth() + 1;
  return (
    <h1>
      {pathname === "/" || pathname.includes("profile") ? null : `${month}월`}
      {title}
    </h1>
  );
};

export default Title;
