const TediousMssql = require("@edwinspire/tedious-mssql");

export class Response {
    constructor() {
    }
    execute(function_name, pgdata, req, res) {
        try {
            this[function_name](pgdata, req, res);
        } catch (error) {
            console.trace(error);
            res.status(500).json({error: error, function_name: function_name});  
        }
    }
    Test(pgdata, req, res) {
        res.status(200).json({ ok: 'Personalizado y llamado por pgapi' });
    }

    async DriverMsSql(pgdata, req, res) {
        try {
            
            let query = pgdata.query;
            let sql = new TediousMssql(pgdata.connection_string);
            const result = await sql.execSql(query, pgdata.query_parameters);
            res.status(200).json(result.rows);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

    }
}