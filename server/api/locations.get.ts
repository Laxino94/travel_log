import { findLocations } from '../../app/lib/db/queries/location'
import defineAuthenticatedEventHandler from '../../app/utils/define-authenticated-event-handler'

export default defineAuthenticatedEventHandler(async (event) => {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  return findLocations(event.context.user.id)
})
