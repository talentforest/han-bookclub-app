interface SubtitleProps {
  title: string;
  className?: string;
}

const Subtitle = ({ title, className }: SubtitleProps) => {
  return (
    <h3
      className={`flex w-fit items-center text-[17px] font-medium text-blue1 ${className}`}
    >
      {title}
    </h3>
  );
};

export default Subtitle;
