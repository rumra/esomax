var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(
  path.join(__dirname, 'public'),
  {
    user: {
      name: 'R3',
      email: 'rumra@gmail.com'
    }
  },
  function(err) {
    if (err) {
      console.log('\n>>>>>> error');
      console.log(err);
      console.log('<<<<<< end block error');
    }

    console.log('Published!');
  }
);
