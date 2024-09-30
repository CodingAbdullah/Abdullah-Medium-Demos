import { GlacierClient } from '@glacier-network/client';

const privateKey = `0xf7311f908890f7aeaf46d0185cf4234ae926cf896b2c50590d6735a37c827045`;
const client = new GlacierClient('https://p0.onebitdev.com/glacier-gateway', {
  privateKey,
});