import SanityClient from '@sanity/client';
export const client = new SanityClient({
  projectId: 'tx7tsu7z',
  dataset: 'production',
  apiVersion: '2021-03-29',
});
