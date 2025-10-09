import type { DrizzleError } from 'drizzle-orm'

import { InsertLocation } from '~/lib/db/schema'

import { findLocationByName, getUniqueSlug, insertLocation } from '../../app/lib/db/queries/location'

export default defineEventHandler(async (event) => {
  // Ensure the user is authenticated
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: ' Unauthorized'
    }))
  }
  // Validate the request body
  const result = await readValidatedBody(event, InsertLocation.safeParse)
  if (!result.success) {
    // Handle validation errors
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join('')}: ${issue.message}`)
      .join('; ')
    // e.g. "name: Name is required; age: Age must be a number"
    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join('')] = issue.message
        return errors
      }, {} as Record<string, string>)
    // e.g. { name: "Name is required", age: "Age must be a number" }
    return sendError(event, createError({
      statusCode: 422, // Unprocessable Entity
      statusMessage,
      data
    }))
  }
  // Check for existing location with the same name for this user
  const existingLocation = await findLocationByName(result.data, event.context.user.id)
  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409, // Conflict
      statusMessage: 'Location with the same name already exists'
    }))
  }
  // Generate a unique slug
  const slug = await getUniqueSlug(result.data.name)
  // Insert the new location into the database
  try {
    return insertLocation(result.data, slug, event.context.user.id)
  }
  catch (e) {
    const error = e as DrizzleError
    // Handle unique constraint violation for slug
    if (error.message.startsWith('Failed query')) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'slug must be unique'
      }))
    }
    // Re-throw other errors
    throw error
  }
})
