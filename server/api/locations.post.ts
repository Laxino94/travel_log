import type { DrizzleError } from 'drizzle-orm'

import { and, eq, like } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'
import slugify from 'slug'

import db from '~/lib/db'
import { InsertLocation, location } from '~/lib/db/schema'

const nanoid = customAlphabet('1234567890abcdefjhijklmnopqrstuvwxyz', 5)

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: ' Unauthorized'
    }))
  }
  const result = await readValidatedBody(event, InsertLocation.safeParse)
  if (!result.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join('')}: ${issue.message}`)
      .join('; ')
    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join('')] = issue.message
        return errors
      }, {} as Record<string, string>)
    return sendError(event, createError({
      statusCode: 422, // Unprocessable Entity
      statusMessage,
      data
    }))
  }
  const existingLocation = await db.query.location.findFirst({
    where:
      and(
        eq(location.userId, event.context.user.id),
        eq(location.name, result.data.name)
      )
  })
  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409, // Conflict
      statusMessage: 'Location with the same name already exists'
    }))
  }
  const baseSlug = slugify(name, { lower: true })
  let slug = baseSlug

  const existingSlugs = await db.query.location.findMany({
    columns: { slug: true },
    where: like(location.slug, `${baseSlug}%`)
  })

  if (existingSlugs.some(s => s.slug === baseSlug)) {
    do {
      slug = `${baseSlug}-${nanoid()}`
    } while (existingSlugs.some(s => s.slug === slug))
  }
  try {
    const [created] = await db.insert(location).values({
      ...result.data,
      slug,
      userId: event.context.user.id
    }).returning()
    return created
  }

  catch (e) {
    const error = e as DrizzleError
    if (error.message.startsWith('Failed query')) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'slug must be unique'
      }))
    }
    throw error
  }
})
