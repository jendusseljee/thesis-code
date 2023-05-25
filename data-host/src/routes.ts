import { Router } from 'express';
import { SignedEntry } from './common/entries';
import { addSignedEntry } from './database';
//import { getSignedRecord, addSignedRecord } from './database.js';

const router = Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.post('/uploadSignedEntry', async (req, res) => {
  const signedEntry = req.body as SignedEntry;
  await addSignedEntry(signedEntry);
  res.status(200).send('ok');
});

// router.get('/getSignedRecord', (req, res) => {
//   const { uuid } = req.query;
//   if (!uuid) {
//     res.status(400).send('Missing required fields: uuid');
//     return;
//   }
  
//   getSignedRecord(uuid)
//     .then((signatures) => {
//       if (!signatures) {
//         res.status(404).send('No signatures found for uuid: ' + uuid);
//         return;
//       }
//       res.send(signatures);
//     }
//   );
// });

export default router;