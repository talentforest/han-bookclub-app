import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "assets/chevron_left.svg";

const BackButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return <BackIcon onClick={onClick} width="14" height="14" />;
};

export default BackButton;
