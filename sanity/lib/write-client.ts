import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId ,token } from '../env'


export const Writeclient = createClient({
  projectId,
 dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token
})

console.log(Writeclient.config())