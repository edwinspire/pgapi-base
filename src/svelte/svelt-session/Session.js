//const { REDIRECT_ON_UNAUTHORIZED, PORT } = process.env;
import { UserSession } from "./Store";
const uFetch = require("@edwinspire/universal-fetch");

export async function RequireSession(module, page, session) {
  console.log("<<< RequireSession >>>", module, page, session, globalThis);
  try {
    // TODO: hacer dinamica la url
    let FData = new uFetch();
    const response = await FData.post(
      `https://${page.host}/pgapi_v1/gui/check/path`,
      { page, session }
    );
    console.log("<<<-- RequireSession -->>>", response.status);
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
