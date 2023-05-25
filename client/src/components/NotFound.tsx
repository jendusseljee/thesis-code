
import {useState} from "react";
import { NSEC } from "../common/not_found";

type Props = {
  nsec: NSEC;
  requestedUUID: string;
};

const NotFound = ({nsec, requestedUUID}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const isValid = nsec.signature.verify();

  return (
    <div className="flex flex-col gap-1 border rounded-md px-2 py-1">
      <div className="flex flex-row gap-3" onClick={() => setExpanded(!expanded)}>
        <p>{expanded ? 'V' : '>'}</p>
        <p className={`text-${isValid ? 'green' : 'red'}-700`}>404</p>
      </div>
      <div>
        {expanded && <div className="grid grid-cols-[75px_500px] gap-2 overflow-scroll">
          <p className="text-xs">Requested UUID: </p>
          <p className="text-xs">{requestedUUID}</p>
          <p className="text-xs">Previous UUID: </p>
          <p className="text-xs">{nsec.previousUUID}</p>
          <p className="text-xs">Next UUID: </p>
          <p className="text-xs">{nsec.nextUUID}</p>
        </div>}
      </div>
    </div>
  )
};

export default NotFound;
