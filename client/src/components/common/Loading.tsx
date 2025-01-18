interface ILoadingProps {
  className?: string;
}

const Loading = ({ className }: ILoadingProps) => {
  return (
    <div
      className={`col-span-full flex w-[70vh] items-center justify-center ${className}`}
    >
      로딩중...
    </div>
  );
};

export default Loading;
