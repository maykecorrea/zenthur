function logRoutes(app) {
  console.log('\n📋 ROTAS REGISTRADAS:');
  app._router.stack.forEach(function(middleware) {
    if(middleware.route) { // routes registered directly on the app
      console.log(`📌 ${middleware.route.path}`);
    } else if(middleware.name === 'router') { // router middleware
      middleware.handle.stack.forEach(function(handler) {
        if(handler.route) {
          const path = handler.route.path;
          const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
          console.log(`📌 ${methods} ${path}`);
        }
      });
    }
  });
  console.log('');
}

module.exports = logRoutes;
