const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// GET /api/sync/status
router.get('/status', (req, res) => {
  res.json({
    success: true,
    status: 'ONLINE',
    edgeKioskSyncAvailable: true,
    meshProtocol: 'PindVidya-Mesh-v1',
    serverTime: new Date().toISOString()
  });
});

// POST /api/sync/batch
router.post('/batch', (req, res) => {
  const { deviceId, clientTimestamp, pendingEvents } = req.body;

  if (!deviceId || !Array.isArray(pendingEvents)) {
    return res.status(400).json({
      success: false,
      message: 'deviceId and pendingEvents array are required for offline reconciliation.'
    });
  }

  const processedEvents = [];
  const conflicts = [];

  for (const event of pendingEvents) {
    const { eventId, type, studentId, payload, recordedAt } = event;

    if (!eventId || !type || !studentId) {
      conflicts.push({
        eventId: eventId || 'unknown',
        reason: 'Malformed event payload'
      });
      continue;
    }

    processedEvents.push({
      eventId,
      status: 'COMMITTED',
      reconciledAt: new Date().toISOString()
    });
  }

  const batchReceiptId = `sync-rcpt-${crypto.randomBytes(4).toString('hex')}`;

  res.json({
    success: true,
    batchReceiptId,
    syncedAt: new Date().toISOString(),
    totalReceived: pendingEvents.length,
    totalCommitted: processedEvents.length,
    totalConflicts: conflicts.length,
    processedEvents,
    conflicts,
    serverVersion: '1.0.0-edge-compatible'
  });
});

module.exports = router;
