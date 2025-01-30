import { FiAlertOctagon, FiInfo } from 'react-icons/fi';

interface GuideLineProps {
  text: string;
  color?: 'red' | 'green' | 'gray';
  icon?: boolean;
}

const GuideLine = ({ text, color = 'gray', icon = true }: GuideLineProps) => {
  const textColor = {
    red: 'text-pointCoral stroke-pointCoral',
    green: 'text-green1 stroke-green1',
    gray: 'text-gray1 stroke-gray1',
  };

  return (
    <div className="mb-2 gap-1">
      {icon &&
        (color === 'red' ? (
          <FiAlertOctagon
            className={`mb-0.5 inline text-base ${textColor[color]}`}
          />
        ) : (
          <FiInfo className={`mb-0.5 inline text-base ${textColor[color]}`} />
        ))}
      <span className={`ml-1 text-base leading-6 ${textColor[color]}`}>
        {text}
      </span>
    </div>
  );
};

export default GuideLine;
