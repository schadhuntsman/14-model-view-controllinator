const router = require('../routes');
const homeRoutes = require('./api/home-routes');
const withAuth = require('../utils/auth');

router.use('/', withAuth, home-routes);

const dashboardRoutes = require('./dashboard-routes');

router.use('/dashboard', '/dashboardRoutes');

module.exports = router;