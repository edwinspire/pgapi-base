const { REDIRECT_ON_UNAUTHORIZED, PORT } = process.env;
import { UserSession } from "./Store";
const uFetch = require("@edwinspire/universal-fetch");

export async function RequireSession(module, page, session) {
  console.log("RequireSession", module, page, session);
  var FData = new uFetch();
  let resp = await FData.post(
    `https://localhost:3000/pgapi_v1/gui/check/path`,
    { page, session }
  );
  let resp_path = await resp.json();

  console.log("RequireSession", resp_path);

  if (resp_path.enabled) {
    if (resp_path.ispublic) {
      return { page: page, session: session };
    } else {
      if (session && session.user) {
        let aut = resp_path.roles.some((role) => {
          return role === session.user.role;
        });

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
}

/*
RETURN_JSON := SELECT gui.fn_check_path(BODY_JSON->'page'->>'path');
*/
