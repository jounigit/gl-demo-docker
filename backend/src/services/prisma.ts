import { PrismaClient } from '@prisma/client'
// import { PrismaSlug } from 'prisma-slug'

export const prisma = new PrismaClient({
  log: ['query', 'error']
}).$extends({
  query: {
    album: {
      create({ args, query  }) {
        if (args.data && args.data?.title) {
          const slug = args.data?.title.toLowerCase().replace(/ /g, '-')
          args.data.slug = slug
        }
        return query(args)
      },
      update({ args, query }) {
        // If title is updated, regenerate the slug field
        if (args.data && args.data?.title) {
          const slug = args.data?.title.toString().toLowerCase().replace(/ /g, '-')
          args.data.slug = slug
        }
        return query(args)
      },
    },
  }
})
