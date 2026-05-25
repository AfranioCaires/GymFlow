# App Requirements

## Functional Requirements (FRs)

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to get the profile of a logged-in user;
- [x] It must be possible to get the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to get their check-in history;
- [x] It must be possible for the user to search for nearby gyms;
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to perform a check-in at a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

## Business Rules (BRs)

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot perform 2 check-ins on the same day;
- [x] The user cannot check in if they are not within 100m of the gym;
- [x] The check-in can only be validated up to 20 minutes after being created;
- [x] The check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators;

## Non-Functional Requirements (NFRs)

- [x] The user's password must be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);
