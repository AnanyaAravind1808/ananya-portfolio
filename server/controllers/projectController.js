import mongoose from 'mongoose';
import Project from '../models/Project.js';

// GET /api/projects
export async function getProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
}

// GET /api/projects/:id
export async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error(`Invalid project ID: ${id}`);
    }

    const project = await Project.findById(id);

    if (!project) {
      res.status(404);
      throw new Error(`Project not found with ID: ${id}`);
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

// POST /api/projects
export async function createProject(req, res, next) {
  try {
    const { title, description, technologies, category, image, github, demo } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Title and description are required fields.');
    }

    const project = await Project.create({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : [],
      category,
      image,
      github,
      demo,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

// PUT /api/projects/:id
export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error(`Invalid project ID: ${id}`);
    }

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      res.status(404);
      throw new Error(`Project not found with ID: ${id}`);
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/projects/:id
export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error(`Invalid project ID: ${id}`);
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404);
      throw new Error(`Project not found with ID: ${id}`);
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
}
