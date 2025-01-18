interface SubtitleProps {
  title: string;
}

const Subtitle = ({ title }: SubtitleProps) => {
  return (
    <h3 className="mb-2 flex w-fit items-center text-lg font-medium text-text sm:mb-1 sm:text-[15px]">
      {title}
    </h3>
  );
};

export default Subtitle;
