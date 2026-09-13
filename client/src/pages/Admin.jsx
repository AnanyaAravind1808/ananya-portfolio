import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../services/api.js';
import './Admin.css';

const emptyForm = {
  title: '',
  description: '',
  technologies: '',
  category: '',
  image: '',
  github: '',
  demo: '',
};

function Admin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(
        err?.message ||
          'Could not load projects. Make sure the backend server and database are running.'
      );
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (project) => {
    setEditingId(project._id || project.id);
    setForm({
      title: project.title || '',
      description: project.description || '',
      technologies: (project.technologies || []).join(', '),
      category: project.category || '',
      image: project.image || '',
      github: project.github || '',
      demo: project.demo || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      technologies: form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      category: form.category.trim(),
      image: form.image.trim(),
      github: form.github.trim(),
      demo: form.demo.trim(),
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }
      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err?.message || 'Could not save the project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    const confirmed = window.confirm(`Delete project "${project.title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteProject(project._id || project.id);
      await loadProjects();
    } catch (err) {
      setError(err?.message || 'Could not delete the project. Please try again.');
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Project Admin</h1>
            <p className="section-subtitle">Manage the projects shown on the portfolio.</p>
          </div>
          <Link to="/" className="btn btn-outline btn-small">
            ← Back to site
          </Link>
        </div>

        <p className="admin-warning">
          <strong>Development page:</strong> this admin area has no authentication and should not
          be exposed publicly in production. To secure it, add a login step (e.g. JWT-based auth
          with a protected route) before deploying, and restrict the corresponding backend routes
          with an auth middleware.
        </p>

        {error && (
          <p className="form-status form-status-error" role="alert" style={{ marginBottom: '1.5rem' }}>
            {error}
          </p>
        )}

        <div className="admin-layout">
          <form className="card admin-form" onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.1rem' }}>{editingId ? 'Edit Project' : 'Add Project'}</h2>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="technologies">Technologies (comma-separated)</label>
              <input
                id="technologies"
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React.js, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input id="category" name="category" value={form.category} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image path or URL</label>
              <input id="image" name="image" value={form.image} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="github">GitHub URL</label>
              <input id="github" name="github" value={form.github} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="demo">Live Demo URL</label>
              <input id="demo" name="demo" value={form.demo} onChange={handleChange} />
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving…' : editingId ? 'Update Project' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-outline" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="card">
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>Existing Projects</h2>
            {loading ? (
              <p>Loading projects…</p>
            ) : projects.length === 0 ? (
              <p className="admin-empty">
                No projects found. This can happen if the backend/database isn&apos;t running yet,
                or none have been added.
              </p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project._id || project.id}>
                        <td>{project.title}</td>
                        <td>{project.category}</td>
                        <td className="admin-table-actions">
                          <button
                            type="button"
                            className="btn btn-outline btn-small"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-small"
                            onClick={() => handleDelete(project)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
