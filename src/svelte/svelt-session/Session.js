const { REDIRECT_ON_UNAUTHORIZED, PORT } = process.env;
import { UserSession } from "./Store";
//const uFetch = require("@edwinspire/universal-fetch");

export async function RequireSession(module, page, session) {
  console.log("<<< RequireSession >>>", module, page, session, globalThis);
  try {
    // TODO: hacer dinamica la url
    const response = await module.fetch("https://localhost:3000/pgapi_v1/gui/check/path", {
      method: "POST",
      //mode: 'cors', // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(JSON.stringify({ page, session })), // body data type must match "Content-Type" header
    });
    
    let resp_path = await response.json();
    let path = resp_path.path;

    if (path.enabled) {
      if (path.ispublic) {
        return { page: page, session: session };
      } else {
        if (session && session.user) {
          // Valida si el rol tiene permisos para acceder a la pagina
          let aut = path.roles.some((role) => {
            return role === session.user.role || role === "*";
          });
          // Si el rol no tiene permisos, valida el acceso por usuario
          if (!aut) {
            aut = path.users.some((u) => {
              return u === session.user.username;
            });
          }

          if (aut) {
            UserSession.set(session.user);
            return { page: page, session: session };
          } else {
            module.error(
              403,
              new Error(`No tiene permisos para la página ${page.path}`)
            );
          }
        } else {
          module.error(401, new Error(`La página ${page.path} requiere login`));
        }
      }
    } else {
      module.error(404, new Error(`Página ${page.path} no encontrada`));
    }
  } catch (error) {
    module.error(500, error);
  }
}
