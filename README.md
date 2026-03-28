# Yayasan Amanah Satria Indonesia – Website

A modern, responsive website built to support and showcase social programs, donations, and community initiatives by Yayasan Amanah Satria Indonesia (YASI).

## Feats

- Landing page
- About page
- Blog page integration powered by Sanity Content Management System (CMS)

## Tech Stack

- Framework: Astro
- Styling: Tailwind CSS
- CMS: Sanity

## Project Structure

This project is my first project implementing feature-driven folder instead of traditional ones separated by layers (controllers, services, etc.) with three separate concerns, which are shared, features (have dependencies to shared), and pages (have dependencies to features and shared). 

## Project Management

This project is my first attempt at leveraging Jira for project management. As I am working on this project solo, I decided to use Kanban as the framework. Although it is still not optimal, messy, and not automated in a pipeline just yet, I have gained considerable knowledge in what developers do in a professional setting. 

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run dev server

```bash
npm run dev
```

- Visit http://localhost:4321 to view the website
- Visit http://localhost:3333 to manage the web's blog content with Sanity Studio

## Environment Variables

Create a `.env` file in the root directory (inside of the astro-app folder)

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=your_dataset
```

## Sanity CMS

- Content is managed via Sanity Studio
- Data is fetched using GROQ queries
- Supports rich text (PortableText), images, and dynamic routing via slugs

## Author

Aldrich Reinhart Wahyudi
