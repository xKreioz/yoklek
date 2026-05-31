const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const ExpertApplication = require('../models/ExpertApplication');
const VerificationSubmission = require('../models/VerificationSubmission');

async function requireAdmin(req, res, next) {
  const user = await User.findById(req.user.userId).select('role');
  if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
}

// ── Stats overview ────────────────────────────────────────────────────────────
router.get('/stats', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [users, exercises, pendingSubmissions, pendingExperts] = await Promise.all([
      User.countDocuments(),
      Exercise.countDocuments(),
      VerificationSubmission.countDocuments({ status: 'pending' }),
      ExpertApplication.countDocuments({ status: 'pending' }),
    ]);
    res.json({ users, exercises, pendingSubmissions, pendingExperts });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// ── Users ─────────────────────────────────────────────────────────────────────
router.get('/users', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password -resetToken -resetTokenExpiry').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/users/:id/role', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'expert', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    res.json(user);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// ── Expert Applications ───────────────────────────────────────────────────────
router.get('/expert-applications', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const apps = await ExpertApplication.find()
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/expert-applications/:id/approve', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const app = await ExpertApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    app.status = 'approved'; app.reviewedBy = req.user.userId; await app.save();
    await User.findByIdAndUpdate(app.userId, { role: 'expert' });
    res.json({ message: 'Expert approved' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/expert-applications/:id/reject', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const app = await ExpertApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Not found' });
    app.status = 'rejected'; app.reviewedBy = req.user.userId; await app.save();
    res.json({ message: 'Application rejected' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// ── Exercises ─────────────────────────────────────────────────────────────────
router.get('/exercises', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ createdAt: -1 });
    res.json(exercises);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/exercises/:id/toggle-verified', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const ex = await Exercise.findById(req.params.id);
    if (!ex) return res.status(404).json({ message: 'Not found' });
    ex.verified = !ex.verified; await ex.save();
    res.json(ex);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/exercises/:id', authMiddleware, requireAdmin, async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// ── Verification Submissions ──────────────────────────────────────────────────
router.get('/submissions', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const subs = await VerificationSubmission.find()
      .populate('userId', 'firstName lastName email')
      .populate('exerciseId', 'name muscleGroup')
      .populate('reviewedBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
