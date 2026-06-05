// Serve Swagger UI at /api/docs from openapi.yaml
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const swaggerUi = require('swagger-ui-express');

const spec = yaml.parse(fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8'));

function mountSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec, {
    customSiteTitle: 'YOKLEK API Docs',
  }));
  // Raw spec (useful for codegen / Postman import)
  app.get('/api/openapi.json', (req, res) => res.json(spec));
}

module.exports = { mountSwagger, spec };
