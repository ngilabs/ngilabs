export default function middleware(request) {
  const url = new URL(request.url);

  // 1. Verifica se a pessoa está tentando acessar a página restrita
  if (url.pathname.startsWith('/hml')) {
    
    // 2. Pega o "Referer" (a página de onde o usuário veio)
    const deOndeVeio = request.headers.get('referer');
    
    // 3. Pega o domínio do seu site atual (ex: seusite.vercel.app)
    const hostDoSeuSite = request.headers.get('host');

    // 4. A LÓGICA DE BLOQUEIO:
    // Se "deOndeVeio" for nulo (ou seja, a pessoa digitou direto na barra ou usou um favorito)
    // OU se a pessoa veio de um site diferente (não contém o seu domínio)
    if (!deOndeVeio || !deOndeVeio.includes(hostDoSeuSite)) {
      
      // Bloqueia e redireciona a pessoa de volta para a página inicial (ou para o externo.html)
      url.pathname = '/externo'; 
      return Response.redirect(url);
    }
    
    // Se passou pela verificação acima, significa que ela clicou no link dentro do seu site. Acesso liberado!
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};