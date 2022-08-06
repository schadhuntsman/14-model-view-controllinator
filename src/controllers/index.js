const router = require('../routes');
const homeRoutes = require('../routes/api/home-routes');

router.use('/', home-routes);

const dashboardRoutes = require('./dashboard-routes');

router.use('/dashboard', '/dashboardRoutes');

module.exports = router;