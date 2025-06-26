document.addEventListener('DOMContentLoaded', () => {
    console.log("DEBUG: Página carregada. O script produtos.js iniciou.");

    const seletorOrdenacao = document.getElementById('ordenar-produtos');
    const container = document.querySelector('.products-grid');

    if (!seletorOrdenacao || !container) {
        console.error("DEBUG: ERRO CRÍTICO - Não foi possível encontrar o seletor ou o container. Verifique o HTML.");
        return; 
    }
    console.log("DEBUG: Seletor de ordenação e container de produtos encontrados com sucesso.");

    seletorOrdenacao.addEventListener('change', () => {
        console.log("--- NOVO EVENTO DE ORDENAÇÃO ---");
        const ordem = seletorOrdenacao.value;
        console.log(`DEBUG: Opção escolhida pelo usuário: '${ordem}'`);

        const produtosParaOrdenar = Array.from(container.querySelectorAll('.product-card'));
        console.log("DEBUG: Ordem dos produtos ANTES de ordenar (pelo data-order):", produtosParaOrdenar.map(p => p.dataset.order));

        produtosParaOrdenar.sort((a, b) => {
            let valorA, valorB;

            if (ordem === 'menor-preco' || ordem === 'maior-preco') {
                valorA = parseFloat(a.dataset.price);
                valorB = parseFloat(b.dataset.price);
            } else {
                valorA = parseInt(a.dataset.order);
                valorB = parseInt(b.dataset.order);
            }
            
            if (ordem === 'maior-preco') {
                return valorB - valorA; 
            }
            return valorA - valorB; 
        });

        console.log("DEBUG: Ordem dos produtos DEPOIS de ordenar (pelo data-order):", produtosParaOrdenar.map(p => p.dataset.order));
        
        console.log("DEBUG: Limpando o container e redesenhando os produtos na nova ordem.");
        container.innerHTML = '';
        produtosParaOrdenar.forEach(produto => {
            container.appendChild(produto);
        });
        console.log("--- FIM DO EVENTO DE ORDENAÇÃO ---");
    });
});