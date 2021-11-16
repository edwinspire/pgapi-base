const { REDIRECT_ON_UNAUTHORIZED } = process.env;
import { UserSession } from "./Store";
import {uFetch} from "@edwinspire/universal-fetch/src/fetch";

export async function RequireSession(module, page, session) {
console.log("RequireSession", module, page, session);
  //var FData = new uFetch();
  //let resp = await FData.get(`/api/session/${session}`);

  if (session && session.user) {
    UserSession.set(session.user);
    return { page: page, session: session };
  } else {
    UserSession.set({});
    return module.redirect(302, REDIRECT_ON_UNAUTHORIZED || "/UNAUTHORIZED");
  }
}
