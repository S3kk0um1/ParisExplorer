# ParisExplorer

A React Native application for discovering events and activities
in Paris, powered by the Paris Open Data API.

Browse events, search loaded results by title, view event details
and save favourites locally on your device.

---

## Features

- **Event feed:** browse event cards with titles and cover images.
- **Pagination:** load additional events in batches of 20 while scrolling.
- **Search:** filter loaded events by title, ignoring letter case.
- **Pull to refresh:** request updated event data from the feed.
- **Event details:** view descriptions, dates, addresses and cover images.
- **External links:** open the event website from its details screen.
- **Persistent favourites:** save favourite event IDs with AsyncStorage
  and restore them when the application starts.
- **Shared state:** keep favourite selections synchronised between
  screens through React Context.
- **Feedback:** display loading indicators, empty results and basic
  network error messages.

---

## Tech stack

| Technology | Role |
|---|---|
| React Native 0.86 | Application interface |
| React 19.2 | Components and state management |
| TypeScript | Static typing |
| Expo SDK 57 | Development tooling and platform integration |
| Expo Router | File-based navigation |
| React Context API | Shared favourites state |
| AsyncStorage | Local persistence of favourite IDs |
| Fetch API | HTTP requests to Paris Open Data |

Exact dependency versions are defined in `package.json`
and recorded in `package-lock.json`.

---

## How it works

The application retrieves events directly from the Paris Open Data API.
No separate application backend is required.

The `useLocations` hook handles fetching, pagination and request state.
The feed displays the returned events through reusable `LocationCard`
components.

Selecting a card opens the details screen. Favourite selections are
managed by `useFavorites`, shared through `FavoritesContext` and stored
locally with AsyncStorage.

Only favourite IDs are persisted; event details are fetched from the API.

---

## Data source

ParisExplorer uses the **Que faire à Paris ?** dataset published
on the Paris Open Data portal.

The application requests records from:

```text
https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records
```

Requests use `limit=20` and an increasing `offset`.

| API field | Application use |
|---|---|
| `id` | Event identifier |
| `title` | Event title |
| `lead_text` | Short description |
| `cover_url` | Cover image |
| `url` | Event website |
| `date_start`, `date_end` | Start and end dates |
| `address_street`, `address_zipcode`, `address_city` | Event address |

The current API request does not include an API key.

---

## Project structure

| File or directory | Responsibility |
|---|---|
| `src/app/index.tsx` | Home route |
| `src/app/_layout.tsx` | Navigation, theme provider and favourites context |
| `src/app/details.tsx` | Event details and external website link |
| `src/app/favorites.tsx` | Favourites screen |
| `src/screens/FeedScreen.tsx` | Feed, search, pagination and refresh controls |
| `src/components/LocationCard.tsx` | Reusable event card |
| `src/hooks/useLocations.ts` | Event fetching and pagination |
| `src/hooks/useFavorites.ts` | Favourite selection and local persistence |
| `assets/` | Application images and icons |
| `app.json` | Expo application configuration |
| `eas.json` | EAS build profiles |

---

## Prerequisites

- Node.js 22.13.x or a later compatible release in the Node.js 22 series.
- npm.
- Git.
- An internet connection to retrieve events and images.
- For mobile use: an emulator, simulator or physical device with
  an Expo client compatible with SDK 57.

The iOS simulator requires macOS and Xcode.

---

## Installation

```bash
git clone https://github.com/S3kk0um1/ParisExplorer.git
cd ParisExplorer
npm ci
```

## Run locally

Start the Expo development server:

```bash
npm start
```

Use the development-server options to open the application
on your configured device or simulator.

The following platform commands are also available:

| Command | Purpose |
|---|---|
| `npm run android` | Start Expo and open the Android target |
| `npm run ios` | Start Expo and open the iOS simulator target |
| `npm run web` | Start the web development target |

Each command requires the corresponding environment.
Platform scripts are provided, but this README does not claim
complete validation across Android, iOS and web.

---

## Usage

1. Open the **Sortir à Paris** feed.
2. Scroll to load more events.
3. Use the search field to filter events already loaded.
4. Select an event to view its details.
5. Tap the heart control to add or remove a favourite.
6. Open **Mes Favoris** to view matching favourite events.
7. Select **Consulter le site de l’événement** to open its website.

Favourite selections are restored from local storage when the
application restarts, subject to the display limitation below.

---

## Build configuration

The repository includes the following EAS profiles in `eas.json`:

| Profile | Configuration |
|---|---|
| `development` | Development client with internal distribution |
| `preview` | Internal distribution, with APK output for Android |
| `production` | Production build with automatic version increment |

The Expo configuration is linked to the author's EAS project.
Building under another Expo account requires configuring an EAS
project accessible to that account.

These profiles describe the build configuration; they do not
indicate that a published release is available.

---

## Current limitations

- **Search scope:** search filters loaded events only, rather than
  querying the entire dataset.
- **Favourites display:** the favourites screen fetches its own first
  batch of 20 events and filters it by saved IDs. A favourite outside
  that batch may not appear, even though its ID remains stored.
- **Offline access:** event details are not persisted for offline
  browsing.
- **Error handling:** network feedback is basic, and local storage
  failures do not yet have dedicated recovery handling.

## Tests

The repository does not currently include an automated test suite
or an npm test script.

---

## Development context

ParisExplorer was initialised with `create-expo-app`.

The project provides practical experience with REST API integration,
custom React hooks, reusable components, navigation and persistent
local state.

Some starter components remain in the repository.

