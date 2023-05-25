import {useState} from "react";
import { SignedEntry } from "../common/entries";

type Props = {
  entry: SignedEntry;
};

const SignedEntryView = ({entry}: Props) => {
  const isValid = entry.signature.verify();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-1 border rounded-md px-2 py-1">
      <div className="flex flex-row gap-3" onClick={() => setExpanded(!expanded)}>
        <p>{expanded ? 'V' : '>'}</p>
        <p className={`text-${isValid ? 'green' : 'red'}-700`}>{entry.hash}</p>
      </div>
      <div>
        {expanded && <div className="grid grid-cols-[75px_500px] gap-2 overflow-scroll">
          <p className="text-xs">UUID: </p>
          <p className="text-xs">{entry.uuid}</p>
          <p className="text-xs">Signature: </p>
          <p className={isValid ? 'text-xs text-green-700' : 'text-xs text-red-700'}>{entry.signature.signature}</p>
          <p className="text-xs">PubKey: </p>
          <p className="text-xs">{}</p>
        </div>}
      </div>
    </div>
  )
};

export default SignedEntryView;
