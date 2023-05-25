type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({children, onClick}: Props) => {
  return <button className="border rounded-sm shadow px-3" onClick={onClick}>{children}</button>;
};

export default Button;
