const bcrypt = require('bcrypt');
function index(req, res) {
  if (req.session.loggedin) {
		// Output username
    res.redirect('/');
  } else {
    res.render('login/index');
  }
}

function register(req, res) {
  res.render('login/register');
}

function registerP(req, res) {
  res.render('login/registerP');
}

function storeUser(req,res){
  const data=req.body;
  req.getConnection((err,conn) => {
    conn.query('SELECT * FROM users WHERE email= ?',[data.email], (err,userData) => {
      if (userData.length>0){
        res.render('login/register', {error: 'User already exists'});
      } else {
        bcrypt.hash(data.password, 12).then(hash => {
          console.log(hash);
          data.password=hash;
          //console.log(data);
          req.getConnection((err,conn) => {
            conn.query('INSERT INTO users SET ?',[data], (err,rows) => {
              res.redirect('/'); 
            });
          });
      
        });
      }
    });
  });
} 


function auth(req, res) {
	let email = req.body.email;
	let password = req.body.password;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
      if(rows.length > 0) {
        console.log(rows);
      } else {
        console.log('not exist this email in the system');
      }
      /*
      req.session.loggedin = true;
	req.session.name = name;

  res.redirect('/');*/
      
    });
  });
}

function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}


module.exports = {
  index: index,
  register: register,
  auth: auth,
  logout: logout,
  storeUser: storeUser,
  registerP,registerP

}

