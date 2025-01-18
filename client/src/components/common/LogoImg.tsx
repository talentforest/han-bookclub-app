interface LogoImgProps {
  className?: string;
}

export default function LogoImg({ className = '' }: LogoImgProps) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/hanpage_logo.png`}
      alt="독서모임 한페이지 로고"
      className={`${className}`}
    />
  );
}
