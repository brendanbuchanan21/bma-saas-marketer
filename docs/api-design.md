Base URL convention (e.g., /api/v1/).

REST principles: plural nouns (/clients, /posts).

Authentication (JWT or API key in headers).

Response format (always return { success, data, error }).

Example routes:

POST /api/v1/clients → create client profile

GET /api/v1/posts?clientId=123 → list posts

POST /api/v1/schedule → schedule a post