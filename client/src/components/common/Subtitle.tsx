interface SubtitleProps {
  title: string;
}

const Subtitle = ({ title }: SubtitleProps) => {
  return (
    <h3 className="mb-2 flex w-fit items-center text-[17px] font-medium text-blue-800 max-sm:mb-2">
      {title}
    </h3>
  );
};

export default Subtitle;
