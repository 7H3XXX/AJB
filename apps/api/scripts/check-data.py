import json
from random import choice

with open('data/job-listings.json', 'r') as f:
    listings: list[dict] = json.load(f)

with open('data/organisations.json', 'r') as f:
    organisations: list[dict] = json.load(f)

with open('data/users.json') as f:
    users: list[dict] = json.load(f)


# data directories
usersByEmail = {
    user.get("email"): user
    for user in users
}

organisationsByName = {
    org.get("name"): org
    for org in organisations
}


for org in organisations:
    email = org.get("createdByEmail")
    if email not in usersByEmail:
        print(org)

for job in listings:
    companyName = job.get("oragnisationName")
    if companyName not in organisationsByName:
        newName = choice(list(organisationsByName.keys()))
        job.update({"oragnisationName": newName})


with open('data/job-listings.json', 'w') as f:
    json.dump(listings, f)
