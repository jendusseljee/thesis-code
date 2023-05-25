import { NSEC } from "./not_found";
import { Entry, SignedEntry } from "./entries";

function genHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const character = input.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash |= 0;
  }
  return hash.toString(16);
}

export class Signature {
  public message: string;
  public signature: string;
  public publicKey: PublicKey;

  constructor(message: string, signature: string, publicKey: PublicKey) {
    this.message = message;
    this.signature = signature;
    this.publicKey = publicKey;
  }

  public verify(): boolean {
    const privateKey = this.publicKey.key.split('').reverse().join('');
    return this.signature == genHash(this.message + privateKey);
  }
}


export class PrivateKey {
  public key: string;
  public publicKey: PublicKey; // The associated publicKey.

  static fromString(key: string): PrivateKey {
    const privateKey = new PrivateKey();
    privateKey.key = key;
    const publicKeyStr = key.split('').reverse().join('');
    privateKey.publicKey = new PublicKey(publicKeyStr);
    return privateKey;
  }

  constructor() {
    this.key = Math.random().toString(36).substring(2);

    const publicKeyStr = this.key.split('').reverse().join('');
    this.publicKey = new PublicKey(publicKeyStr);
  }

  private sign(message: string): Signature {
    const signature = genHash(message + this.key);
    return new Signature(message, signature, this.publicKey);
  }

  public signNSEC(previousUUID: string, nextUUID: string): NSEC {
    const signature = this.sign(previousUUID + nextUUID);
    return new NSEC(previousUUID, nextUUID, signature);
  }

  public signEntry(entry: Entry): SignedEntry {
    const signature = this.sign(entry.hash + this.key);
    return new SignedEntry(entry, signature);
  }
}

export class PublicKey {
  public key: string;

  constructor(key: string) {
    this.key = key;
  }
}
