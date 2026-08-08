# YouTube Uploader

Bulk-upload local videos to YouTube. Title, description, and tags are pulled
from a markdown file that sits next to each video file — no manual copy-pasting
in YouTube Studio.

## How it works

For each video you drop into `videos/`, put a markdown file with the **same
name** next to it:

```
videos/
  my-first-video.mp4
  my-first-video.md
```

`my-first-video.md`:

```markdown
---
title: "How I Automated My YouTube Uploads"
tags: [automation, nodejs, youtube-api, indiehacker]
privacyStatus: public        # public | unlisted | private
categoryId: "28"             # optional, default "22" (People & Blogs)
playlistId: PLxxxxxxxxxxxx   # optional, OR set PLAYLIST_ID in .env for all videos
publishAt: 2026-08-10T09:00:00Z  # optional, ISO date to schedule the video
filename: my-keyword-rich-name.mp4  # optional: upload under this name (ranking signal)
---
Everything below the --- is used as the video description, written exactly
as you want it to appear, links/hashtags included.
```

Run the script, and it uploads every video that has a matching `.md` file,
then moves both files into `videos/uploaded/` so nothing gets uploaded twice.

---

## 1. Create a YouTube channel (skip if you already have one)

1. Go to [youtube.com](https://youtube.com) and sign in with the Google
   account you want to own the videos.
2. Click your profile icon → **Create a channel**, follow the prompts.

## 2. Get API credentials

You need a Google Cloud project with the YouTube Data API enabled, and an
OAuth Client ID (uploading requires OAuth — a plain API key can't upload on
your behalf).

1. Go to [console.cloud.google.com](https://console.cloud.google.com/) and
   create a new project (or reuse one).
2. **APIs & Services → Library** → search **YouTube Data API v3** → **Enable**.
3. **APIs & Services → OAuth consent screen**:
   - User type: **External**.
   - Fill app name / support email (anything, doesn't need to be public).
   - Under **Test users**, add the Gmail address of your YouTube channel's
     Google account. This lets you use the app without going through Google's
     verification review, as long as only you (and up to 100 test users) use it.
4. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Application type: **Desktop app** (simplest) — or **Web application**
     with `http://localhost:3000/oauth2callback` added under **Authorized
     redirect URIs** if you pick Web application.
   - Save the generated **Client ID** and **Client Secret**.

## 3. Configure the project

```bash
cd youtube-uploader
npm install
cp .env.example .env
```

Edit `.env`:

```
CLIENT_ID=your-client-id.apps.googleusercontent.com
CLIENT_SECRET=your-client-secret
REDIRECT_URI=http://localhost:3000/oauth2callback
VIDEOS_DIR=./videos
```

## 4. Authorize once

```bash
npm run auth
```

This opens your browser, asks you to log in and approve access, then saves
`token.json` locally. You only need to do this once — `upload.js` reuses and
auto-refreshes it. If you ever revoke access or delete `token.json`, just run
`npm run auth` again.

## 5. Upload your videos

Drop matching video + `.md` pairs into `videos/` (see format above, and
`videos/example-video.md` for a working sample), then:

```bash
npm run upload          # upload everything pending
npm run upload -- 1,3   # just #1 and #3 (order: white,black,green,zoom,blue,red,pink,yellow,gray,purple,orange,blank)
npm run upload -- 1-5   # a range
npm run upload -- green-screen,blue-screen   # by slug
npm run upload -- all   # same as no args
```

You'll see per-file upload progress, the final `youtu.be/...` link for each
video, and a full record written to `upload-log.json`. Successfully uploaded
pairs are moved into `videos/uploaded/`.

### This repo ships with ready-made metadata

The `videos/` folder already contains the 12 color-screen MP4s **and** a
`.md` file for each one (built from `docs/archive/README-videos.md`) with the
keyword-rich titles, descriptions, tags, and `filename` overrides already
filled in. So the whole manual step is: fill `.env`, `npm run auth` once,
then `npm run upload` whenever you have a new batch.

---

## Notes & limits

- **Daily quota**: YouTube's default API quota is 10,000 units/day, and each
  upload costs ~1,600 units — so roughly **6 uploads per day** by default.
  If you need more, request a quota increase in Google Cloud Console
  (APIs & Services → YouTube Data API v3 → Quotas).
- **Unverified app warning**: Since the OAuth consent screen isn't submitted
  for Google verification, you may see an "unverified app" warning when you
  authorize — this is expected for personal-use scripts. Click
  **Advanced → Go to (app name)** to proceed. It's safe since it's your own
  app and credentials.
- **Scheduling**: set `publishAt` in the markdown frontmatter to schedule a
  video; the script will mark it private and YouTube auto-publishes it at
  that time.
- **Never commit** `.env` or `token.json` — both grant access to your
  channel. `.gitignore` already excludes them.
- Supported video formats: `.mp4 .mov .mkv .avi .webm`.

## File overview

| File | Purpose |
|---|---|
| `get-token.js` | Run once to authorize and generate `token.json` |
| `upload.js` | Scans `videos/`, uploads each video+markdown pair |
| `videos/example-video.md` | Sample metadata file format |
| `upload-log.json` | Auto-generated log of every upload attempt |
