import { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { PrivateKey, PublicKey, Signature } from "../common/signatures";

const RsaSigning = () => {
  const [privateKey, setPrivateKey] = useState<PrivateKey | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState<Signature | null>(null);

  const generateKeyPair = () => {
    const pk = new PrivateKey();
    setPrivateKey(pk);
    setPublicKey(pk.publicKey);
  };

  return (
    <div className="widget w-1/3">
      <h1 className="text-2xl font-bold">RSA tools</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Create a new RSA key pair</h2>
        <Button onClick={generateKeyPair}>Generate key pair</Button>

        <TextField label="Private key" value={privateKey?.key ?? ""} />
        <TextField label="Public key" value={publicKey?.key ?? ""} />

      </div>
    </div>
  );
};

export default RsaSigning;
