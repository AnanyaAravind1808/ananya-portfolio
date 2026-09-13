// ============================================================
// Seeds the database with the initial set of portfolio projects.
// Safe to re-run: it clears existing projects before inserting,
// so it will not create duplicates on repeated runs.
//
// Usage:
//   cd server
//   npm run seed
// ============================================================

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from '../models/Project.js';

dotenv.config();

const initialProjects = [
  {
    title: 'EcoChat – AI Climate Action Assistant',
    description:
      'An AI-powered assistant designed to provide actionable guidance for everyday climate-related questions and encourage sustainable habits.',
    technologies: ['React.js', 'JavaScript', 'Node.js', 'AI API'],
    category: 'AI / Web Development / Sustainability',
    image: '/images/placeholder-project.svg',
    github: '',
    demo: '',
  },
  {
    title: 'SolarSense – Intelligent Sun-Tracking System',
    description:
      'An embedded system that uses LDR sensors and an Arduino to detect differences in light intensity and adjust a solar panel toward the stronger light source.',
    technologies: ['Arduino UNO', 'LDR Sensors', 'Servo Motor', 'C/C++'],
    category: 'Embedded Systems / Renewable Energy',
    image: '/images/placeholder-project.svg',
    github: '',
    demo: '',
  },
  {
    title: 'Automatic Night Light',
    description:
      'An automated lighting system that uses an LDR sensor to detect ambient light and control lighting accordingly, helping reduce unnecessary electricity usage.',
    technologies: ['Arduino', 'LDR', 'LED', 'Sensors'],
    category: 'Embedded Systems / Clean Energy',
    image: '/images/placeholder-project.svg',
    github: '',
    demo: '',
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '[seed] MONGODB_URI is not set. Create server/.env from .env.example first.'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('[seed] Connected to MongoDB.');

    await Project.deleteMany({});
    console.log('[seed] Cleared existing projects.');

    const inserted = await Project.insertMany(initialProjects);
    console.log(`[seed] Inserted ${inserted.length} projects successfully.`);

    process.exit(0);
  } catch (error) {
    console.error('[seed] Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
