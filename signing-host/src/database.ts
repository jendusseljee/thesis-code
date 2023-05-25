/// <reference types="./simple-json-store.d.ts" />
import SimpleJsonStore from 'simple-json-store';
import { PrivateKey } from "./common/signatures";
import { NSEC } from './common/not_found';

const store = new SimpleJsonStore('store.json', { nsecs: [] });

const getZoneSigningPrivateKey = async () => {
  const zoneSigningKeyString = await store.get('zoneSigningKey');
  
  if (!zoneSigningKeyString) {
    const newZoneSigningKey = new PrivateKey();
    store.set('zoneSigningKey', newZoneSigningKey.key);
    return newZoneSigningKey;
  }
  const zoneSigningKey = PrivateKey.fromString(zoneSigningKeyString);

  return zoneSigningKey;
}

export const getZoneSigningKey = async () => {
  const privateKey = await getZoneSigningPrivateKey();
  return privateKey.publicKey;
}

export const addNsec = async (uuid: string) => {
  const nsecs: NSEC[] = await store.get('nsecs');
  const zoneSigningKey = await getZoneSigningPrivateKey();

  // If NSEC already exists, throw error
  if (nsecs.findIndex(nsec => nsec.previousUUID == uuid) != -1) throw new Error('NSEC already exists');

  // If no NSECs exist, just add it
  if (nsecs.length == 0) {
    store.set('nsecs', [zoneSigningKey.signNSEC(uuid, uuid)]);
    return;
  }
  
  // If one NSEC exists, add a second and create a circular linked list
  if (nsecs.length == 1) {
    const oldNsec1 = nsecs[0]; // (1, 1)
    const nsec1 = zoneSigningKey.signNSEC(oldNsec1.previousUUID, uuid); // (1, 2)
    const nsec2 = zoneSigningKey.signNSEC(uuid, oldNsec1.nextUUID); // (2, 1)
    store.set('nsecs', [nsec1, nsec2]);
    return;
  }

  // If more than one NSEC exists, find the NSEC that is before the new NSEC
  if (nsecs.length > 1) {
    const oldNsec1Index = nsecs.findIndex(nsec => nsec.previousUUID < uuid && nsec.nextUUID > uuid);
    if (oldNsec1Index == -1) {
      // New NSEC should be placed at the beginning or ending of the list
      const oldNsec1 = nsecs[nsecs.length - 1]; // (3, 2)
      const nsec1 = zoneSigningKey.signNSEC(oldNsec1.previousUUID, uuid); // (3, 1)
      const nsec2 = zoneSigningKey.signNSEC(uuid, oldNsec1.nextUUID); // (1, 2)
      nsecs[nsecs.length - 1] = nsec1;

      if (uuid < nsecs[0].previousUUID) {
        // Beginning of the list
        nsecs.splice(0, 0, nsec2);
      } else {
        // End of the list
        nsecs.push(nsec2);
      }
      store.set('nsecs', nsecs);
    } else {
      // New NSEC should be placed in the middle of the list
      const ondNsec1 = nsecs[oldNsec1Index]; // (1, 3)
      const nsec1 = zoneSigningKey.signNSEC(ondNsec1.previousUUID, uuid); // (1, 2)
      const nsec2 = zoneSigningKey.signNSEC(uuid, ondNsec1.nextUUID); // (2, 3)
      nsecs[oldNsec1Index] = nsec1;
      nsecs.splice(oldNsec1Index + 1, 0, nsec2);
      store.set('nsecs', nsecs);
    }
    return;
  }
}