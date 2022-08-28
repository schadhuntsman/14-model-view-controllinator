const router = require('../routes');
const dashboardRoutes = require('./dashboard-routes');
const homeRoutes = require('./home-routes');
const withAuth = require('../utils/auth');

router.use('/', withAuth, homeRoutes);
router.use('/', dashboardRoutes);

module.exports = router;