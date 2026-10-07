# Happy 50 Rory — GitHub + Cloudflare Pages

Includes the revised invitation, photos, Semi-Formal dress code, both scriptures, clickable directions and RSVP storage through Cloudflare D1. No Netlify dependency or guest login.

## 1. GitHub
Create a separate repository named happy50rory (private is fine). Unzip this package and upload its CONTENTS: public, functions, schema.sql and README.md. Preserve the folders. Do not upload only the ZIP. Commit after all files are uploaded.

## 2. Create the database
In Cloudflare, open Storage & databases > D1 SQL database. Create happy50rory-rsvp. Open its Console. Copy the complete contents of schema.sql, paste into the Console and run.

## 3. Connect Cloudflare Pages to GitHub
Under Workers & Pages, create a Pages project using Git integration (Import an existing Git repository). Connect GitHub and choose happy50rory.

- Framework preset: None
- Build command: blank (or exit 0 if required)
- Build output directory: public
- Root directory: blank
- Production branch: main

Save and deploy.

## 4. Connect registration storage
Open the Pages project > Settings > Bindings > Add > D1 database.

- Variable/binding name: DB (uppercase, exactly)
- Database: happy50rory-rsvp

Save and redeploy the latest commit so the binding takes effect. Add the binding to preview too if testing preview deployments.

## 5. Test before sharing
Open the Pages URL and submit a registration with your real email. A successful save leads to the confirmation page. Open D1 Console and run:

```sql
SELECT name,email,guests,created_at FROM reservations ORDER BY created_at DESC;
```

Confirm your entry appears. Only people with access to the Cloudflare database can read the list. There is no public guest-list endpoint.

For kitchen planning:

```sql
SELECT COALESCE(SUM(guests),0) AS total_guests FROM reservations;
```

## 6. Domain, after testing
Open the Pages project > Custom domains > Set up a custom domain. Enter your owned domain and follow the DNS instructions. A private GitHub repository does not make a Pages website private: the deployed URL is accessible unless you configure separate access restrictions.

## Updates and limitations
Upload all changed files in one GitHub commit to trigger one deployment. Redeploying does not erase registrations. Do not delete the D1 database. Existing registrations from Netlify or the previous host are not included. Automatic guest confirmation emails and organizer email notifications are not configured. Registration works after the database schema and DB binding are set up and the live test succeeds.
