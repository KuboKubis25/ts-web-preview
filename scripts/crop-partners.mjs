import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
// The first visible ink is the aircraft wing at source x=13. Remove only
// its left white margin (including near-white JPEG ringing), preserving pixels.
await mkdir('src/assets', { recursive: true });
await sharp('_source/img/Na%C5%A1i_Partneri.jpg')
  .extract({ left: 13, top: 0, width: 1255, height: 209 })
  .png()
  .toFile('src/assets/partners-cropped.png');
