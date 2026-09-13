import Contact from '../models/Contact.js';
import { isDbConnected } from '../config/db.js';

// POST /api/contact
export async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error('Name, email, subject, and message are all required.');
    }

    if (!isDbConnected()) {
      res.status(503);
      throw new Error('Database is unavailable. Please try again later.');
    }

    const contact = await Contact.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Thank you for reaching out!',
      data: { id: contact._id, createdAt: contact.createdAt },
    });
  } catch (error) {
    next(error);
  }
}
