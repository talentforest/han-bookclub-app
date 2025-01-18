import { FiAlertOctagon, FiInfo } from 'react-icons/fi';

interface GuideLineProps {
  text: string;
  color?: 'red' | 'green' | 'gray';
  icon?: boolean;
}

const GuideLine = ({ text, color = 'gray', icon = true }: GuideLineProps) => {
  const textColor = {
    red: 'text-red stroke-red',
    green: 'text-green1 stroke-green1',
    gray: 'text-gray1 stroke-gray1',
  };

  return (
    <div className="my-1 gap-1">
      {icon &&
        (color === 'red' ? (
          <FiAlertOctagon
            className={`mb-0.5 inline size-[15px] ${textColor[color]}`}
          />
        ) : (
          <FiInfo className={`mb-0.5 inline size-[15px] ${textColor[color]}`} />
        ))}
      <span className={`ml-1 text-[15px] leading-6 ${textColor[color]}`}>
        {text}
      </span>
    </div>
  );
};

export default GuideLine;
