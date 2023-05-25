type Props = {
  label: string,
  value: string,
  onChange?: (value: string) => void,
};

const TextField = ({label, value, onChange}: Props) => {
  console.log({label, value, onChange})
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      {onChange === undefined 
        ? <textarea className="border rounded-sm h-36 overflow-y-scroll text-sm bg-white p-2" value={value} readOnly /> 
        : <textarea className="border rounded-sm h-36 overflow-y-scroll text-sm bg-white p-2" value={value} onChange={(e) => onChange(e.target.value)} />
        }
    </div>
  );
};

export default TextField;
