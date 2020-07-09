const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const jsonfile = require('jsonfile')
const morgan = require('morgan')   
const cors = require('cors')

const server = jsonServer.create();
const router = jsonServer.router('./server/data/db.json');
const userdb = JSON.parse(fs.readFileSync('./server/data/users.json', 'UTF-8'));
const schooldb = JSON.parse(fs.readFileSync('./server/data/school-list.json', 'UTF-8'));

server.use(morgan('dev')); 
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());
serer.use(cors());

const SECRET_KEY = '123456789';
const expiresIn = '1hr';

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(express.static('www'));
server.set('port', process.env.PORT || 3000);

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
/*function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}*/

// Check if the user exists in database
function isAuthenticated({email, password}){
 	return userdb.users.findIndex(user => user.email === email && user.pwd === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body
  if (isAuthenticated({email, password}) === false) {
  	res
      .status(200)
      .send('{"error":{"text":"Bad request wrong username and password"}}');
    //const status = 401
    //const message = 'Incorrect email or password'
    //res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  res.status(200).json({access_token})
});


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
   try {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    	const status = 401
	    const message = 'Bad authorization header'
	    res.status(status).json({status, message})
	    return
	} else
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                //return res.sendStatus(403);
            }

            req.user = user;
        });
    } else {
        return res.sendStatus(401);
    }
	}catch(error){
		const status = 403
	    const message = 'Error: access_token is not valid'
	    res.status(status).json({status, message})
	}
	next();
};

server.get('/users', authenticateJWT, (req, res) => {
	try {
	  //userdb.users.findIndex(user => user.email === req.email)
	  //console.log(res.json(userdb.users.findIndex(user => user.email === req.user.email)));
	   return res.json(userdb.users.find(user => user.email === req.user.email));

	}
	
 catch(err){
 		res.sendStatus(401);
 }
});

server.post('/sendReport', authenticateJWT, (req, res) => {
	try {
		const { email } = req.user;
		const report = req.body;

			const file = './server/data/report.json'
			const obj = { report }
			 
			jsonfile.writeFile(file, obj, { flag: 'a', spaces: 4, EOL: '\r\n' }, function (err) {
			  if (err) console.error(err)
			})

    	res.sendStatus(200);
	}
	catch(err){
		res.sendStatus(401);
	}
});

server.get('/schools', (req, res) =>{
	try{
		return res.json(schooldb.schools.find(schl => schl.CODE === req.query.code));
	}catch (err) {
		res.sendStatus(401);
	}
});

server.get('/school-list', (req, res) => {
	try{
		return res.json(schooldb.schools);
	}catch (err) {
		res.sendStatus(401);
	}
});
/* Admin maiddleware to create book */
/*app.post('/books', authenticateJWT, (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }


    const book = req.body;
    books.push(book);

    res.send('Book added successfully');
});*/

		/*Initial commit*/

/*server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message})
  }
});*/

			/*Second commit */
/*function authenticateToken(req, res, next) {
	try {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null){ //return res.sendStatus(401)
		 throw 'Invalid';
	}
	else{
		 const decodedToken = verifyToken(req.headers.authorization.split(' ')[1]);
		 const userEmail = decodedToken.email;
     if (req.body.email && req.body.email !== userEmail ){ //return console.log(JSON.stringify(decode.email));
     	throw 'wrong';
	  }
	  next();
	}
}catch (err) {
	    const status = 403
	    const message = 'Error: access_token is not valid'
	    res.status(status).json({status, message})
	    const dat = req.data
	    next()
	  }
  
    
		jwt.verify(token, SECRET_KEY, (err) => {
			if(err) return res.sendStatus(403)
				//req.user = user
			next()
		//})
}*/

server.use(router)

server.listen(server.get('port'), () => {
  console.log('Run Auth API Server on port: ' + server.get('port'))
})