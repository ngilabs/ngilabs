export default function middleware(request) {
  const url = new URL(request.url);

  // 1. Escreva aqui TODAS as páginas que você quer bloquear o acesso direto
  const paginasBloqueadas = ['/hml', '/aposentados', '/caldata', '/calendario', '/dash', '/efetivo', '/fluxomaker', '/organomaker', '/simulador', '/simupai', '/simusaude', '/transformador', '/impacto'];

  // Verifica se a página que a pessoa quer acessar está na lista acima
  const tentarAcessarBloqueada = paginasBloqueadas.some(pagina => url.pathname.startsWith(pagina));

  if (tentarAcessarBloqueada) {
    
    const deOndeVeio = request.headers.get('referer');
    const hostDoSeuSite = request.headers.get('host');

    // Se a pessoa digitou na barra ou veio de outro site, bloqueia!
    if (!deOndeVeio || !deOndeVeio.includes(hostDoSeuSite)) {
      
      // Joga a pessoa de volta para a sua "Porta de Entrada" (externo)
      url.pathname = '/externo'; 
      return Response.redirect(url);
    }
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
