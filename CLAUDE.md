# CLAUDE.md

## Project

Build a small "late-night meal buddy" demo for coworkers who are working late and want to invite nearby colleagues to eat together.

Product positioning:

> Help coworkers at the same office location quickly create and join late-night meal invitations, reducing the effort required to organize an informal meetup.

## MVP User Flow

1. Set a nickname and office location.
2. View active invitations for that office location.
3. Create an invitation with a destination, meeting time, and meeting place.
4. Join an invitation once and see its participant count update.
5. Optionally, the creator can mark an invitation as departed or cancelled.

## Priorities

### P0

- Anonymous identity using a nickname, office location, and locally generated device ID.
- Create a late-night meal invitation.
- List active invitations for the same office location.
- Join an invitation without duplicate participation.

### P1

- Allow the creator to mark an invitation as departed or cancelled.

## Acceptance Rules

- Required invitation fields cannot be submitted when empty.
- A newly created invitation appears in the list immediately.
- Invitations show creator, destination, meeting time, meeting place, status, and participant count.
- A user cannot join the same invitation more than once.
- Departed or cancelled invitations cannot be joined.
- Identity and participation remain after a page refresh.

## Technical Stack

- Next.js 14 with the App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Vercel

## Implementation Constraints

- Optimize for a working demo that can be built in about 20 minutes.
- Keep every source file at or below 200 lines.
- Prefer a single-page experience with a dialog or sheet for invitation creation.
- Use Server Components by default; add Client Components only for interactivity.
- Keep Supabase access in a small, dedicated data layer.
- Use existing shadcn/ui components and Lucide icons where appropriate.
- Keep components focused and avoid premature abstractions.
- Add only dependencies required for the core flow.
- Preserve accessibility: labeled fields, keyboard support, visible focus states, and meaningful status text.

## Minimal Data Model

### invitations

- `id`
- `creator_device_id`
- `creator_nickname`
- `office_location`
- `destination`
- `meeting_time`
- `meeting_place`
- `status` (`open`, `departed`, or `cancelled`)
- `created_at`

### participants

- `id`
- `invitation_id`
- `device_id`
- `nickname`
- `created_at`

Enforce a unique constraint on `(invitation_id, device_id)`.

## Explicit Non-Goals

Do not add:

- GPS, maps, distance calculations, or automatic location detection
- Authentication, passwords, phone verification, or enterprise SSO
- Chat, comments, notifications, or messaging
- Restaurant discovery, menus, ordering, delivery, or payments
- Friends, profiles, points, rankings, or social feeds
- Approval flows, waitlists, complex capacity controls, or attendance history
- Analytics dashboards or admin tools

Treat "nearby" as an exact match on the manually entered office location.

## Demo Fallback

If Supabase setup would block the demo, use clearly isolated mock data while preserving the same data-access interface. The primary demo must still support the complete identity, create, browse, and join flow.

## Definition of Done

- The core flow works end to end.
- Empty and loading states are present.
- Duplicate joins are prevented.
- The layout works on mobile and desktop.
- No source file exceeds 200 lines.
- The app builds successfully and is ready for Vercel deployment.
