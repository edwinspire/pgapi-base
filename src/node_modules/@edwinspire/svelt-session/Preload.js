// Esta función sirve para validar si el usuario está logueado para permitir el acceso a la ruta, caso contrario le devuelve a la pantalla de login

export function CheckSession(module, page, session, url_redirect_if_no_session) {
  if (session && session.user) {
    return { page: page, session: session }
  } else {
    return module.redirect(302, url_redirect_if_no_session);
  }
}


/*
export class Preload {

  constructor(module, page, session, url_redirect_if_no_session) {
    this.module = module;
    this.page = page;
    this.session = session;
    this.redirect_if_no_session = url_redirect_if_no_session;
  }

  existsSession() {
    if (this.session && this.session.current_user) {
      return true;
    } else {
      return false;
    }
  }

  get data() {

    try {
      if (!this.existsSession()) {
        return this.module.redirect(401, "/");
      } else {
        return { page1: this.page, session1: this.session }
      }

    } catch (error) {
      console.trace(error);
      return "/"
    }
  }

}
*/

