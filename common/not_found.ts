import { Signature } from "./signatures";


export class NSEC {
  public previousUUID: string;
  public nextUUID: string;
  public signature: Signature;

  constructor(previousUUID: string, nextUUID: string, signature: Signature) {
    this.previousUUID = previousUUID;
    this.nextUUID = nextUUID;
    this.signature = signature;
  }
}
