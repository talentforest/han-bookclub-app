import { FiAlertOctagon, FiInfo } from 'react-icons/fi';

interface GuideLineProps {
  text: string;
  color?: 'red' | 'green' | 'gray';
  icon?: boolean;
  className?: string;
}

const GuideLine = ({
  text,
  color = 'gray',
  icon = true,
  className = '',
}: GuideLineProps) => {
  const textColor = {
    red: 'text-pointCoral stroke-pointCoral',
    green: 'text-green1 stroke-green1',
    gray: 'text-gray1 stroke-gray1',
  };

  return (
    <div className={`mb-2 gap-1 ${className}`}>
      {icon &&
        (color === 'red' ? (
          <FiAlertOctagon
            className={`mb-0.5 inline text-[15px] ${textColor[color]}`}
          />
        ) : (
          <FiInfo className={`mb-0.5 inline text-[15px] ${textColor[color]}`} />
        ))}
      <span className={`ml-1 text-[15px] leading-6 ${textColor[color]}`}>
        {text}
      </span>
    </div>
  );
};

export default GuideLine;
