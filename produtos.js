document.addEventListener('DOMContentLoaded', () => {
    const seletorOrdenacao = document.getElementById('ordenar-produtos');
    const campoBusca = document.getElementById('input-busca');
    const container = document.querySelector('.products-grid');
    const todosOsProdutos = Array.from(container.querySelectorAll('.product-card'));

    function filtrarProdutos() {
        const termoPesquisado = campoBusca.value.toLowerCase();

        todosOsProdutos.forEach(produto => {
            const nomeDoProduto = produto.querySelector('.product-card-name').textContent.toLowerCase();

            const deveMostrar = nomeDoProduto.includes(termoPesquisado);

            produto.style.display = deveMostrar ? 'flex' : 'none';
        });

        ordenarProdutos(); // Reorganiza os visíveis
    }

    function ordenarProdutos() {
        const ordem = seletorOrdenacao.value;
        const produtosVisiveis = todosOsProdutos.filter(p => p.style.display !== 'none');

        produtosVisiveis.sort((a, b) => {
            const valorA = parseFloat(a.dataset.price);
            const valorB = parseFloat(b.dataset.price);

            if (ordem === 'menor-preco') return valorA - valorB;
            if (ordem === 'maior-preco') return valorB - valorA;

            // ordem padrão
            return parseInt(a.dataset.order) - parseInt(b.dataset.order);
        });

        // Reinsere apenas os visíveis ordenados
        produtosVisiveis.forEach(produto => container.appendChild(produto));
    }

    if (seletorOrdenacao && campoBusca && container) {
        campoBusca.addEventListener('input', filtrarProdutos);
        seletorOrdenacao.addEventListener('change', ordenarProdutos);
        ordenarProdutos(); // inicial
    } else {
        console.error('⚠️ Elementos de filtro ou ordenação não foram encontrados no HTML.');
    }
});
