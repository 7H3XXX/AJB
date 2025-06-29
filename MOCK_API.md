Mock API Guide (json-server)
============================

This mock API simulates job listings so the frontend team can build and test without waiting for the backend.

Base URL:
---------
http://localhost:4000

Available Endpoint:
-------------------
GET /jobs → returns all job listings

How to Use Query Parameters:
----------------------------

1. Pagination:
   - http://localhost:4000/jobs?_page=1&_limit=5
   - This returns the first 5 jobs (Page 1)

2. Sorting (by posted date):
   - http://localhost:4000/jobs?_sort=postedDate&_order=desc
   - This returns jobs with the most recent ones first

3. Filtering:
   - http://localhost:4000/jobs?location=Remote
   - http://localhost:4000/jobs?type=Full-time
   - Filters by location or job type

4. Search (any field):
   - http://localhost:4000/jobs?q=developer
   - Searches for "developer" in any text field

5. Filter by skill (partial match):
   - http://localhost:4000/jobs?skills_like=React
   - Shows jobs that mention "React" in the skills list

How to Run the Mock Server:
---------------------------
Option 1 (if you added a script in package.json):
   npm run mock-server

Option 2 (without script):
   npx json-server --watch mock/db.json --port 4000

Example Full URL:
-----------------
http://localhost:4000/jobs?_page=1&_limit=5&_sort=postedDate&_order=desc&location=Remote

Who This is For:
----------------
The Frontend developer team who wants to test fetching, pagination, filtering, and search without waiting for backend APIs.