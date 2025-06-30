CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE access_roles (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    role VARCHAR(20) CHECK (role IN ('admin', 'user', 'employer', 'seeker')) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organisations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    about TEXT,
    website VARCHAR(255),
    image_url VARCHAR(255),
    country VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_categories (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_listings (
    id UUID PRIMARY KEY,
    organisation_id UUID NOT NULL REFERENCES organisations(id),
    posted_by UUID NOT NULL REFERENCES users(id),
    category_id UUID NOT NULL REFERENCES job_categories(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    salary_from DECIMAL,
    salary_to DECIMAL,
    currency VARCHAR(10),
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    experience_level VARCHAR(20) CHECK (experience_level IN ('entry', 'mid', 'senior')),
    type VARCHAR(20) CHECK (type IN ('full-time', 'part-time', 'freelance', 'internship', 'remote')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('created', 'approved', 'rejected')) DEFAULT 'created',
    is_active BOOLEAN DEFAULT TRUE,
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE job_skills (
    id UUID PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES job_listings(id),
    skill_id UUID NOT NULL REFERENCES skills(id),
    UNIQUE (job_id, skill_id) -- Ensures that a skill is associated with a job only once
);