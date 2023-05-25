import{useState} from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { PrivateKey } from "../common/signatures";
import { SignedEntry } from "../common/entries";

const DATA_URL = "http://localhost:3001";
const SIGNING_URL = "http://localhost:3002";

const CentralisedVersion = () => {
  const [uuid, setUUID] = useState<string>("");
  const [hash, setHash] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [signedEntry, setSignedEntry] = useState<SignedEntry | null>(null);

  const uploadSignedEntry = async () => {
    if (!signedEntry) return;

    const response = await fetch(`${SIGNING_URL}/uploadSignedEntry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signedEntry),
    });

    if (response.status === 200) {
      setSignedEntry(null);
    }
  };

  const genSignedEntry = async () => {
    const pKey = PrivateKey.fromString(privateKey);
    const entry = { uuid: uuid, hash: hash}
    const signedEntry = pKey.signEntry(entry);
    setSignedEntry(signedEntry);
  };
    

  return (
    <div className="widget flex flex-col">
      <h1 className="text-2xl font-bol">Signature Store</h1>
      
      <div className="flex flex-row gap-3">
        <div className="flex-1 flex flex-col space-y-5">
          <h2 className="text-xl font-bold">Upload Signed Record</h2>
          <TextField label="UUID" value={uuid} onChange={setUUID} />
          <TextField label="Hash" value={hash} onChange={setHash} />
          <TextField label="Private Key" value={privateKey} onChange={setPrivateKey} />
          <Button onClick={genSignedEntry}>Generate Signed Entry</Button>
          <TextField label="Signed Entry" value={signedEntry == null ? "" : JSON.stringify(signedEntry)} />
          <Button onClick={uploadSignedEntry}>Upload</Button>
        </div>
        {/* <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl font-bold">Fetch signatures</h2>
          <TextField label="Index" value={queryUUID} onChange={(e) => setQueryUUID(e.target.value)} />
          <div>
            <Button onClick={getSignature}>Get</Button>
            <Button onClick={fetchSignatures}>Fetch all</Button>
          </div>
          <div>
            <h3 className="text-md font-bold">Results:</h3>
            {foundSignatures.map((signature: Signature) => (
              <SignatureView entry={signature} />
            ))}
            {foundError && <NotFound nsec={foundError} zoneSigningKey={zoneSigningPublicKey!} />}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CentralisedVersion;
