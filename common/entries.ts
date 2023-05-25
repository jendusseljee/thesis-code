import { Signature } from './signatures';

export type Entry = { // An entry that exists in the existing database.
  uuid: string;
  hash: string;
}

export class SignedEntry {
  public uuid: string;
  public hash: string;
  public signature: Signature;

  constructor(entry: Entry, signature: Signature) {
    this.uuid = entry.uuid;
    this.hash = entry.hash;
    this.signature = signature;
  }
}
