const crypto = require('crypto');
let profilesData = require('../data/profiles.json').profiles;

exports.getAllProfiles = (req, res) => {
  // Sanitize: do not return PIN in list
  const sanitized = profilesData.map(({ pin, ...rest }) => rest);
  res.json({
    success: true,
    count: sanitized.length,
    data: sanitized
  });
};

exports.createProfile = (req, res) => {
  const { name, grade, pin, avatar, preferredDialect, schoolCode } = req.body;

  if (!name || !grade || !pin) {
    return res.status(400).json({
      success: false,
      message: 'Name, grade, and a 4-digit PIN are required.'
    });
  }

  const newProfile = {
    id: `student-${crypto.randomBytes(3).toString('hex')}`,
    name,
    grade: parseInt(grade, 10),
    pin: String(pin),
    avatar: avatar || '🧑‍🎓',
    preferredDialect: preferredDialect || 'majhi',
    schoolCode: schoolCode || 'PSEB-PB-RURAL',
    streakDays: 1,
    completedLessons: [],
    flnScore: 0
  };

  profilesData.push(newProfile);

  const { pin: _, ...safeProfile } = newProfile;
  res.status(201).json({
    success: true,
    message: 'Learner profile created successfully.',
    data: safeProfile
  });
};

exports.switchProfile = (req, res) => {
  const { id, pin } = req.body;
  const profile = profilesData.find(p => p.id === id);

  if (!profile) {
    return res.status(404).json({
      success: false,
      message: 'Learner profile not found.'
    });
  }

  if (profile.pin !== String(pin)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid PIN for profile.'
    });
  }

  const { pin: _, ...safeProfile } = profile;
  res.json({
    success: true,
    message: `Switched context to ${profile.name}`,
    activeProfile: safeProfile
  });
};

exports.getProfileStreak = (req, res) => {
  const { id } = req.params;
  const profile = profilesData.find(p => p.id === id);

  if (!profile) {
    return res.status(404).json({ success: false, message: 'Profile not found.' });
  }

  res.json({
    success: true,
    data: {
      id: profile.id,
      name: profile.name,
      streakDays: profile.streakDays,
      flnScore: profile.flnScore,
      completedLessonsCount: profile.completedLessons.length,
      badges: [
        { title: 'ਨਿਯਮਿਤ ਸਿੱਖਿਆਰਥੀ (Consistent Learner)', icon: '🔥', earned: profile.streakDays >= 3 },
        { title: 'ਗਣਿਤ ਮਾਹਰ (Math Star)', icon: '⭐', earned: profile.flnScore >= 80 }
      ]
    }
  });
};
