export default function ErrorMsg({ msg }: { msg: string }) {
  return <p className="pl-1 pt-1 text-sm text-red-500">{msg}</p>;
}
