import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const BackButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return <ArrowBackIosNewIcon onClick={onClick} />;
};

export default BackButton;
