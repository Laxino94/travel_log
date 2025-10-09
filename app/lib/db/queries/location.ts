import { and, eq, like } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'
import slugify from 'slug'

import type { InsertLocation } from '../schema/location'

import db from '..'
import { location } from '../schema/location'

const nanoid = customAlphabet('1234567890abcdefjhijklmnopqrstuvwxyz', 5)

export async function findLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId)
  })
}

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId)
    )
  })
}

export async function findLocationBySlug(baseSlug: string) {
  return db.query.location.findMany({
    columns: { slug: true },
    where: like(location.slug, `${baseSlug}%`)
  })
}

export async function getUniqueSlug(name: string) {
  const baseSlug = slugify(name, { lower: true })
  let slug = baseSlug
  const existingSlugs = await findLocationBySlug(baseSlug)

  if (existingSlugs.some(s => s.slug === baseSlug)) {
    do {
      slug = `${baseSlug}-${nanoid()}`
    } while (existingSlugs.some(s => s.slug === slug))
  }
  return slug
}
export async function insertLocation(
  insertable: InsertLocation,
  slug: string,
  userId: number
) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId
  }).returning()
  return created
}
