const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogs')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/',dogsRouter)

module.exports = router;
