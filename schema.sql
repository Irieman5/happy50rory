CREATE TABLE IF NOT EXISTS reservations (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 guests INTEGER NOT NULL CHECK(guests BETWEEN 1 AND 10),
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS reservations_created_at ON reservations(created_at);
