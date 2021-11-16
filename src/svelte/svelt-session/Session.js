const { REDIRECT_ON_UNAUTHORIZED, PORT } = process.env;
import { UserSession } from "./Store";
const uFetch = require("@edwinspire/universal-fetch");

export async function RequireSession(module, page, session) {
  //console.log("RequireSession", module, page, session);
  try {
    var FData = new uFetch();
    let resp = await FData.post(
      `https://localhost:3000/pgapi_v1/gui/check/path`,
      { page, session }
    );
    let resp_path = await resp.json();
    let path = resp_path.path;
    //console.log(resp_path, path.enabled);

    if (path.enabled) {
      if (path.ispublic) {
        return { page: page, session: session };
      } else {
        if (session && session.user) {
          let aut = path.roles.some((role) => {
            console.log("some", role, session.user.role);
            return role === session.user.role || role === "*";
          });
//          console.log("RequireSession 1", session.user, aut);
          if (aut) {
            UserSession.set(session.user);
            return { page: page, session: session };
          } else {
            UserSession.set({});
            return module.redirect(
              302,
              REDIRECT_ON_UNAUTHORIZED || "/UNAUTHORIZED"
            );
          }
        } else {
          UserSession.set({});
          return module.redirect(
            302,
            REDIRECT_ON_UNAUTHORIZED || "/UNAUTHORIZED"
          );
        }
      }
    } else {
      // Aqui se deberia redireccionar a una página 404 no encontrada
      return module.redirect(302, "/");
    }
  } catch (error) {
    console.trace(error);
    return module.redirect(302, "/");
  }
}

/*
RETURN_JSON := SELECT gui.fn_check_path(BODY_JSON->'page'->>'path');
*/
