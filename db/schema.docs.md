### `users`

Stores all user accounts including both job seekers and employers/admins.

| Column          | Type      | Description                          |
| --------------- | --------- | ------------------------------------ |
| `id`            | UUID (PK) | Unique identifier                    |
| `email`         | String    | Unique email address                 |
| `firstname`     | String    | User’s first name                    |
| `lastname`      | String    | User’s last name                     |
| `gender`        | String    | Enum: 'male', 'female'               |
| `password_hash` | String    | Hashed password                      |
| `country`       | String    | User's primary country of residence. |
| `image_url`     | String    | URL to user's profile picture.       |
| `created_at`    | Timestamp | Account creation date                |
| `updated_at`    | Timestamp | Last update timestamp                |

---

### `access_roles`

Defines access privileges across the platform.

| Column       | Type      | Description                                 |
| ------------ | --------- | ------------------------------------------- |
| `id`         | UUID (PK) | Unique ID                                   |
| `user_id`    | UUID (FK) | References `users(id)`                      |
| `role`       | String    | Enum: 'admin', 'user', 'employer', 'seeker' |
| `active`     | Boolean   | Access role active state                    |
| `created_at` | Timestamp | Assigned date                               |

---

### `organisations`

Employers can create organizations to post jobs.

| Column       | Type      | Description                                                |
| ------------ | --------- | ---------------------------------------------------------- |
| `id`         | UUID (PK) | Unique ID                                                  |
| `user_id`    | UUID (FK) | Owner/employer who created the org; References `users(id)` |
| `name`       | String    | Organization name                                          |
| `about`      | Text      | Description of the company                                 |
| `website`    | String    | URL                                                        |
| `image_url`  | String    | Logo or image                                              |
| `country`    | String    | Country where org is based                                 |
| `created_at` | Timestamp | Creation date                                              |

---

### `job_categories`

All available categories for selection

| Column       | Type      | Description                        |
| ------------ | --------- | ---------------------------------- |
| `id`         | UUID (PK) | Unique ID                          |
| `name`       | String    | Category name (e.g. 'Engineering') |
| `created_at` | Timestamp | Creation date                      |

---

### `job_listings`

Holds all active and past job postings.

| Column             | Type      | Description                                                                             |
| ------------------ | --------- | --------------------------------------------------------------------------------------- |
| `id`               | UUID (PK) | Unique ID                                                                               |
| `organisation_id`  | UUID (FK) | References `organisations(id)`                                                          |
| `posted_by`        | UUID (FK) | References `users(id)` (employer/admin)                                                 |
| `category_id`      | UUID (FK) | References `job_categories(id)`                                                         |
| `title`            | String    | Job title                                                                               |
| `description`      | Text      | Full job description                                                                    |
| `requirements`     | Text      | Job requirements                                                                        |
| `pay_per_annum`    | Decimal   | Expected salary range                                                                   |
| `country`          | String    | Location                                                                                |
| `website`          | String    | External application link/URL                                                           |
| `experience_level` | String    | e.g. 'entry', 'mid', 'senior'                                                           |
| `type`             | String    | Type of employment (e.g. 'full-time', 'part-time', 'freelance', 'internship', 'remote') |
| `created_at`       | Timestamp | Posting date                                                                            |
| `updated_at`       | Timestamp | Last update                                                                             |

---

### `job_skills`

Skills related to a job listing (many-to-many).

| Column     | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| `id`       | UUID (PK) | Unique ID                     |
| `job_id`   | UUID (FK) | References `job_listings(id)` |
| `skill_id` | UUID (FK) | References `skills(id)`       |

---

### `skills`

All available skills for selection.

| Column | Type      | Description        |
| ------ | --------- | ------------------ |
| `id`   | UUID (PK) | Unique ID          |
| `name` | String    | e.g., 'JavaScript' |

---

### `educational_backgrounds`

Stores user's academic history.

| Column               | Type      | Description              |
| -------------------- | --------- | ------------------------ |
| `id`                 | UUID (PK) | Unique ID                |
| `user_id`            | UUID (FK) | References `users(id)`   |
| `title`              | String    | e.g., 'Computer Science' |
| `qualification_type` | String    | e.g., 'BSc', 'Diploma'   |
| `school_name`        | String    | Name of institution      |
| `country`            | String    | Location of institution  |
| `description`        | Text      | Additional notes         |
| `date_from`          | Date      | Start date               |
| `date_to`            | Date      | End date                 |

---

### `work_experiences`

Professional experiences per user.

| Column        | Type      | Description            |
| ------------- | --------- | ---------------------- |
| `id`          | UUID (PK) | Unique ID              |
| `user_id`     | UUID (FK) | References `users(id)` |
| `title`       | String    | Job title held         |
| `company`     | String    | Company name           |
| `country`     | String    | Location               |
| `description` | Text      | Description of role    |
| `date_from`   | Date      | Start date             |
| `date_to`     | Date      | End date               |

---

### `resumes`

Resume directory for user-uploaded CVs.

| Column        | Type      | Description            |
| ------------- | --------- | ---------------------- |
| `id`          | UUID (PK) | Unique ID              |
| `user_id`     | UUID (FK) | References `users(id)` |
| `file_url`    | String    | Path to uploaded file  |
| `file_type`   | String    | 'pdf' or 'docx'        |
| `uploaded_at` | Timestamp | Upload date            |

---

### `applications`

Track applications made by users to job listings.

| Column            | Type      | Description                                             |
| ----------------- | --------- | ------------------------------------------------------- |
| `id`              | UUID (PK) | Unique ID                                               |
| `user_id`         | UUID (FK) | Job seeker who applied; References `users(id)`          |
| `job_id`          | UUID (FK) | Job applied to; References `job_listings(id)`           |
| `organisation_id` | UUID (FK) | Organisation applied to; References `organisations(id)` |
| `resume_id`       | UUID (FK) | Resume used for application; References `resumes(id)`   |
| `applied_at`      | Timestamp | Application date                                        |
| `status`          | String    | e.g., 'submitted', 'reviewed'                           |
