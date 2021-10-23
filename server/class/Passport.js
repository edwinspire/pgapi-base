const { WS_WSEASYLOGIN } = process.env;
const db = require('./pgexpress')
const passport = require('passport');
const LocalStrategy = require('passport-local');//

var soap = require('soap');

// Usa base de datos en PostgreSQL
passport.use('local-pg', new LocalStrategy({ usernameField: 'user', passwordField: 'pwd', passReqToCallback: true }, async (req, user, pwd, done) => {

    try {

        let query = {
            name: 'login',
            text: `SELECT users.fn_login($1::TEXT, $2::TEXT)`,
            values: [user, pwd]
        }
        let respg = await db.query(query);

        if (respg.rows.length > 0) {
            let r = respg.rows[0].fn_login;
            if (r.login) {
                return done(null, r);
            } else {
                return done(null, r, { message: r.message });
            }
        } else {
            return done(null, false, { message: 'No se pudo' });
        }

    } catch (error) {
        return done(error);
    }

}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    done(null, id);
});



passport.use('local', new LocalStrategy({ usernameField: 'user', passwordField: 'pwd', passReqToCallback: true }, (req, user, pwd, done) => {

    let result = {
        message: 'Bienvenid@ demo',
        login: true,
        user:
        {
            profile: null,
            username: 'demo',
            fullname: 'Usuario DEMO',
            multilogin: true,
            payload: { iduser: 1, rowkey: 999 }
        }
    }

    //Loguea con la base de datos
    try {


        if (user == "demo" && pwd == "demo") {

            return done(null, result);
        } else {
            result.login = false;
            result.message = "Acceso no permitido";
            return done(null, result, { message: "No tiene acceso" });
        }

    } catch (error) {
        return done(error);
    }

}));




passport.use('easyseguridad', new LocalStrategy({ usernameField: 'user', passwordField: 'pwd', passReqToCallback: true }, (req, user, pwd, done) => {

    let result = {
        message: 'Bienvenid@ ' + user,
        login: false,
        user:
        {
            profile: null,
            username: user,
            fullname: user,
            multilogin: false,
            payload: {}
        }
    }

    //Loguea con la base de datos
    try {

        var args = { _UserName: user, _Password: pwd };
        soap.createClient(WS_WSEASYLOGIN, function (err1, client) {

            if (err1) {
                console.log(err1);
                return done(err1);
            }else if(!client){
                console.log(client);
                return done({client: 'undefined'});
            } else {
                client.ADSIAuthenticate(args, function (err2, result) {

                    if (err2) {
                        console.log(err2);
                        return done(err2);
                    } else {
                        let result_out = {
                            message: result.strMessage,
                            login: result.ADSIAuthenticateResult,
                            user:
                            {
                                profile: null,
                                username: user,
                                fullname: user,
                                multilogin: false,
                                payload: {}
                            }
                        }

                        return done(null, result_out);
                    }

                });
            }

        });

    } catch (error) {
        return done(error);
    }

}));
