const path = require("path");
//const fs = require('fs').promises;
const fsNormal = require("fs");
const { TOKEN_ENCRYPT } = process.env;
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

// TODO: ingresar objeto como parametro
export class User {
  constructor(
    username,
    fullname,
    role,
    multilogin,
    ip,
    user_agent,
    payload,
    expiresIn = '2h',
    isSession = true // Determina si es session de usuario o acceso por apikey
  ) {

    if (!username) {
      throw new Error("Username is required");
    }

    this.username = username;
    this.fullname = fullname || username;
    this.multilogin = multilogin || false;
    this.role = role;
    this.payload = payload;
    this.expiresIn = expiresIn;
    this.isSession = isSession;
    this.ip = ip || "unknow";
    this.user_agent = user_agent || "unknow";
    if (!this.expiresIn) {
      this.expiresIn = "2h";
    }

    if (this.isSession) {
      this.isSession = true;
    } else {
      this.isSession = false;
    }

    const hash = createHash("sha256");
    hash.update(JSON.stringify({ ip: this.ip, user_agent: this.user_agent }));
    this.device = hash.digest("hex");
    this.idtoken = this.device;
    if (this.multilogin) {
      let min = 1;
      let max = 999999999;
      this.idtoken =
        this.idtoken + "-" + Math.floor(Math.random() * (max - min)) + min;
    }
  }
}

export class Token {
  constructor() {
    this._path_token = "tmptoken";
  }

  all() {
    let tokens = {};
    if (fsNormal.existsSync(this._path_token)) {
      fsNormal.readdirSync(this._path_token).forEach((username, index) => {
        let curPath = path.join(this._path_token, username);
        if (fsNormal.lstatSync(curPath).isDirectory()) {
          // recurse
          let tokensUser = fsNormal.readdirSync(curPath).map((tokenfile) => {
            let t = path.join(curPath, tokenfile);
            if (fsNormal.lstatSync(t).isFile()) {
              try {
                return JSON.parse(fsNormal.readFileSync(t, "utf8"));
              } catch (error) {
                console.error(error);
              }
            }
          });
          tokens[username] = tokensUser;
        }
      });
    } else {
      console.log("No hay carpetas en " + this._path_token);
    }
    return tokens;
  }

  read(token) {
    let data;
    try {
      const user = this.getUser(token);
      if (user && user.username) {
        data = JSON.parse(
          fsNormal.readFileSync(this._file_token(user.username, user.idtoken))
        );
      }
    } catch (error) {
      console.log("Error al leer archivo token");
    }
    return data;
  }

  deleteAll() {
    this._rmDir(this._path_token);
  }

  _file_token(username, idtoken) {
    return path.join(this._path_token, username, idtoken + ".token");
  }

  _user_path(username) {
    return path.join(this._path_token, username);
  }

  _create_user_dir(username) {
    if (!fsNormal.existsSync(this._path_token)) {
      fsNormal.mkdirSync(this._path_token);
    }
    let UserDir = this._user_path(username);
    if (!fsNormal.existsSync(UserDir)) {
      fsNormal.mkdirSync(UserDir);
    }
    return UserDir;
  }

  save(token) {
    try {
      const user = this.getUser(token);
      if (user && user.multilogin == false) {
        this.deleteByUser(user.username);
      }

      if (user && user.username) {
        this._create_user_dir(user.username);
        fsNormal.writeFileSync(
          this._file_token(user.username, user.idtoken),
          JSON.stringify(user, null, 4)
        ); // need to be in an async function
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  setToken(response, user) {
    if (!(user instanceof User)) {
      throw new Error("user is not instance of User");
    }

    let t = this.token(user);
    if (t) {
      response.cookie("TOKEN_USER", t, {
        expire: 3600 * 1000 * 24 * 365 * 50, // Expira en 10 años, sin ambargo internamente el token tiene su propia fecha de expiración
      });
      this.save(t);
    }
    return t;
  }

  token(user) {
    if (!(user instanceof User)) {
      throw new Error("user is not instance of User");
    }

    let t;

    if (user && user.username) {
      t = jwt.sign({ ...user }, TOKEN_ENCRYPT, { expiresIn: user.expiresIn });
    } else {
      throw "username not found";
    }

    return t;
  }

  _dirUser(username) {
    return path.join(this._path_token, username);
  }

  _rmDir(dir) {
    if (fsNormal.existsSync(dir)) {
      fsNormal.readdirSync(dir).forEach((file, index) => {
        var curPath = path.join(dir, file);
        //console.log(curPath);
        if (fsNormal.lstatSync(curPath).isDirectory()) {
          // recurse
          this._rmDir(curPath);
        } else {
          // delete file
          fsNormal.unlinkSync(curPath);
        }
      });
      fsNormal.rmdirSync(dir);
    }
  }

  deleteByUser(username) {
    this._rmDir(this._user_path(username));
  }

  getUser(itoken) {
    let user = null;
    if (itoken && typeof itoken === "string") {
      try {
        user = jwt.verify(itoken, TOKEN_ENCRYPT);
      } catch (err) {
        //console.trace(err.message);
        //console.error(err.message);
      }
    }
    return user;
  }

  static get_authorization(req) {
    let authorization = { type: undefined, credentials: undefined };
    if (
      req.headers.authorization &&
      req.headers.authorization.indexOf("Basic ") >= 0
    ) {
      authorization.type = "Basic";
      const base64Credentials = req.headers.authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "ascii"
      );
      const [username, password] = credentials.split(":");
      authorization.credentials = { username, password };
    }
    return authorization;
  }

  getUserFromRequest(req) {
    let toke_user = req.cookies["TOKEN_USER"];
    let user = this.validateSession(toke_user);
    if (!user) {
      // Se trata de detectar el usuario si se está usando Basic Auth
      let authorization = Token.get_authorization(req);
      if (authorization.type === "Basic") {
        if (
          authorization.credentials.username === "pgapikey" &&
          authorization.credentials.password
        ) {
          user = this.getUser(authorization.credentials.password);
        }
      }
    }
    return user;
  }

  validateAsMiddleware(req, res, next) {
    let TokenBD = new Token();
    let user = TokenBD.getUserFromRequest(req);
    if (user) {
      return next();
    } else {
      res.status(401).json({ session: false });
    }
  }

  validateSession(itoken) {
    let user = this.getUser(itoken);
    if (user && user.isSession) {
      try {
        let data = this.read(itoken);
        if (data === undefined) {
          user = null;
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      this.delete(itoken);
    }

    return user;
  }

  delete(itoken) {
    try {
      var user = jwt.decode(itoken, { complete: false });
      if (user) {
        if (user.multilogin) {
          let dir = this._file_token(user.username, user.idtoken);
          if (fsNormal.existsSync(dir)) {
            fsNormal.unlinkSync(dir);
          }
        } else {
          this.deleteByUser(user.username);
        }
      }
    } catch (error) {
      console.error("Error al eliminar archivo token");
    }
  }
}
