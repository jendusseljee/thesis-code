import { Router } from 'express';
import fetch from 'node-fetch';
import { addNsec, getZoneSigningKey } from './database';
import { SignedEntry } from './common/entries';

const router = Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/getZoneSigningKey', async (req, res) => {
  const zoneSigningKey = await getZoneSigningKey();
  res.send(zoneSigningKey);
});

router.post('/uploadSignedEntry', async (req, res) => {
  const signedEntry = req.body as SignedEntry;
  // Upload to data-host
  const response = await fetch('http://localhost:3001/uploadSignedEntry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(signedEntry),
  });
  // If not ok, return error
  if (response.status !== 200) {
    res.status(500).send('Error uploading signed entry to data-host');
    return;
  }
  // If ok, update NSEC n-1 and add NSEC n, return ok
  if (response.status === 200) {
    addNsec(signedEntry.uuid);
    res.status(200).send('ok');
    return;
  }
});

// router.post('/getNSEC', (req, res) => {
//   // Return NSEC that proves signed record with uuid does not exist.
// });

export default router;