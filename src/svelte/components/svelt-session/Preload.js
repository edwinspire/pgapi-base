// Esta función sirve para validar si el usuario está logueado para permitir el acceso a la ruta, caso contrario le devuelve a la pantalla de login
export function CheckSession(module, page, session, url_redirect_if_no_session) {
  if (session && session.user) {
    return { page: page, session: session }
  } else {
    return module.redirect(302, url_redirect_if_no_session);
  }
}