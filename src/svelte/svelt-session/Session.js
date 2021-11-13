const { REDIRECT_ON_UNAUTHORIZED } = process.env;
import { UserSession } from "./Store";
//import {uFetch} from "@edwinspire/universal-fetch/src/fetch";

export function RequireSession(module, page, session) {
  if (session && session.user) {
    UserSession.set(session.user);
    return { page: page, session: session };
  } else {
    UserSession.set({});
    return module.redirect(302, REDIRECT_ON_UNAUTHORIZED || "/UNAUTHORIZED");
  }
}
