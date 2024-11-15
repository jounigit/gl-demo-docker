import { PrismaClient } from '@prisma/client'
// import { PrismaSlug } from 'prisma-slug'
import config from '../utils/config'

export const prisma = new PrismaClient({
  datasources: {
    db: { url: config.DATABASE_URL },
    // db: { url: config.NODE_ENV === 'test' ? config.DB_URL_TEST : config.DB_URL },
  },
  log: ['query', 'error']
}).$extends({
  query: {
    album: {
      create({ args, query }) {
        if (args.data?.title) {
          const slug = args.data?.title.toLowerCase().replace(/ /g, '-')
          args.data.slug = slug
        }
        return query(args)
      },
      update({ args, query }) {
        // If title is updated, regenerate the slug field
        if (args.data?.title) {
          const slug = args.data?.title.toString().toLowerCase().replace(/ /g, '-')
          args.data.slug = slug
        }
        return query(args)
      },
    },
  }
})
