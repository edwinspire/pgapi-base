const { REDIRECT_ON_UNAUTHORIZED, PORT } = process.env;
import { UserSession } from "./Store";
import { uFetch } from "@edwinspire/universal-fetch/src/fetch";

export async function RequireSession(module, page, session) {
  console.log("RequireSession", module, page, session);
  var FData = new uFetch();
  let resp = await FData.post(`https://localhost:${PORT}/pgapi_v1/gui/check/path`, { page, session });
  let resp_path = await resp.json();

  console.log("RequireSession", resp_path);

  if (session && session.user) {
    UserSession.set(session.user);
    return { page: page, session: session };
  } else {
    UserSession.set({});
    return module.redirect(302, REDIRECT_ON_UNAUTHORIZED || "/UNAUTHORIZED");
  }
}

/*
RETURN_JSON := SELECT gui.fn_check_path(BODY_JSON->'page'->>'path');
*/