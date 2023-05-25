/// <reference types="./simple-json-store.d.ts" />
import SimpleJsonStore from 'simple-json-store';
import { SignedEntry } from './common/entries';

const store = new SimpleJsonStore('store.json', { entries: {} });

export const addSignedEntry = async (entry: SignedEntry) => {
  const entries = await store.get('entries');

  entries[entry.uuid] = entry;
  store.set('entries', entries);
}

export const getSignedRecord = async (uuid: string) => {
  const signature = await store.get('entries')[uuid];

  return signature;
}
