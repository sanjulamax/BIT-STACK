import { type SchemaTypeDefinition } from 'sanity'
import { notes } from './notes'
import { author } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [notes , author],
}
