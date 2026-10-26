const express = require('express');
const router = express.Router();
let profilesData = require('../data/profiles.json').profiles;

// POST /api/notifications/ivr-summary
router.post('/ivr-summary', (req, res) => {
  const { studentId, parentPhoneNumber } = req.body;

  const profile = profilesData.find(p => p.id === studentId);
  if (!profile) {
    return res.status(404).json({ success: false, message: 'Student profile not found.' });
  }

  const phone = parentPhoneNumber || '+91-98765-43210';
  
  const ivrScriptPa = `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਜੀ। ਪਿੰਡ ਵਿੱਦਿਆ ਵੱਲੋਂ ਤੁਹਾਡੇ ਬੱਚੇ ${profile.name} ਦੀ ਇਸ ਹਫ਼ਤੇ ਦੀ ਪੜ੍ਹਾਈ ਰਿਪੋਰਟ: ਇਸ ਹਫ਼ਤੇ ਉਹਨਾਂ ਨੇ ${profile.completedLessons.length} ਪਾਠ ਪੂਰੇ ਕੀਤੇ ਹਨ ਅਤੇ ਉਹਨਾਂ ਦਾ ਗਣਿਤ/ਵਿਗਿਆਨ ਸਕੋਰ ${profile.flnScore} ਪ੍ਰਤੀਸ਼ਤ ਰਿਹਾ ਹੈ। ਬੱਚੇ ਨੂੰ ਹੱਲਾਸ਼ੇਰੀ ਦੇਣ ਲਈ ਧੰਨਵਾਦ।`;
  const smsTextPa = `ਪਿੰਡ ਵਿੱਦਿਆ: ${profile.name} ਨੇ ਇਸ ਹਫ਼ਤੇ ${profile.streakDays} ਦਿਨ ਲਗਾਤਾਰ ਪੜ੍ਹਾਈ ਕੀਤੀ। ਸਕੋਰ: ${profile.flnScore}%.`;

  res.json({
    success: true,
    message: 'IVR & SMS dispatch queued successfully for rural outreach.',
    data: {
      studentId: profile.id,
      recipientPhone: phone,
      deliveryChannel: ['IVR_VOICE_CALL', 'PUNJABI_SMS'],
      ivrVoiceScript: ivrScriptPa,
      smsText: smsTextPa,
      status: 'QUEUED'
    }
  });
});

module.exports = router;
