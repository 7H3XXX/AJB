-- Enable UUID generation extension (PostgreSQL-specific)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
    password_hash TEXT NOT NULL,
    country VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACCESS ROLES
CREATE TABLE access_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) CHECK (role IN ('admin', 'user', 'employer', 'seeker')),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORGANISATIONS
CREATE TABLE organisations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    about TEXT,
    website TEXT,
    image_url TEXT,
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOB CATEGORIES
CREATE TABLE job_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOB LISTINGS
CREATE TABLE job_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organisation_id UUID REFERENCES organisations(id) ON DELETE CASCADE,
    posted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id UUID REFERENCES job_categories(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    pay_per_annum DECIMAL(12,2),
    country VARCHAR(100),
    website TEXT,
    experience_level VARCHAR(50),
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SKILLS
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL
);

-- JOB SKILLS (many-to-many between job_listings and skills)
CREATE TABLE job_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE
);

-- EDUCATIONAL BACKGROUNDS
CREATE TABLE educational_backgrounds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    qualification_type VARCHAR(50),
    school_name VARCHAR(255),
    country VARCHAR(100),
    description TEXT,
    date_from DATE,
    date_to DATE
);

-- WORK EXPERIENCES
CREATE TABLE work_experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    company VARCHAR(255),
    country VARCHAR(100),
    description TEXT,
    date_from DATE,
    date_to DATE
);

-- RESUMES
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type VARCHAR(10) CHECK (file_type IN ('pdf', 'docx')),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- APPLICATIONS
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
    organisation_id UUID REFERENCES organisations(id),
    resume_id UUID REFERENCES resumes(id),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'submitted'
);
