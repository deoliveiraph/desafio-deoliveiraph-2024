// Definição dos recintos(refiz tudo assim ficou mais organizado e melhor de ler ;)
const recintos = [
    { id: 1, bioma: 'savana', total: 10, ocupados: 3, animais: ['MACACO'] },
    { id: 2, bioma: 'floresta', total: 5, ocupados: 0, animais: [] },
    { id: 3, bioma: 'savana e rio', total: 7, ocupados: 2, animais: ['GAZELA'] },
    { id: 4, bioma: 'rio', total: 8, ocupados: 0, animais: [] },
    { id: 5, bioma: 'savana', total: 9, ocupados: 3, animais: ['LEAO'] },
];

// Definição dos animais do zoológico
const animais = {
    LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
    LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
    CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
    MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
    GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
    HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
};

class RecintosZoo {
    // Método para verificar se o animal é válido
    validarAnimal(animal) {
        return animais[animal] !== undefined;
    }

    // Método para verificar se a quantidade é válida
    validarQuantidade(quantidade) {
        return quantidade > 0 && Number.isInteger(quantidade);
    }

    // Método principal para analisar os recintos
    analisaRecintos(animal, quantidade) {
        if (!this.validarAnimal(animal)) {
            return { erro: "Animal inválido" };
        }

        if (!this.validarQuantidade(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const especie = animais[animal];
        const recintosViaveis = [];

        recintos.forEach(recinto => {
            if (this.biomaAdequado(recinto, especie) && this.espacoSuficiente(recinto, especie, quantidade)) {
                recintosViaveis.push(`Recinto ${recinto.id} (espaço livre: ${recinto.total - recinto.ocupados - especie.tamanho * quantidade}, total: ${recinto.total})`);
            }
        });

        return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: "Não há recinto viável" };
    }

    // Método para verificar se o bioma do recinto é adequado para a espécie do animal
    biomaAdequado(recinto, especie) {
        return especie.bioma.some(b => recinto.bioma.includes(b));
    }

    // Método para verificar se há espaço suficiente no recinto para alocar os animais
    espacoSuficiente(recinto, especie, quantidade) {
        let espacoNecessario = especie.tamanho * quantidade;

        if (recinto.animais.length > 0 && !recinto.animais.includes(especie.nome)) {
            espacoNecessario += 1;
        }

        if (recinto.animais.some(a => animais[a].carnivoro) && (especie.carnivoro && !recinto.animais.includes(especie.nome))) {
            return false;
        }

        if (especie.nome === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
            return false;
        }

        if (especie.nome === 'MACACO' && recinto.animais.length === 0) {
            return false;
        }

        return (recinto.total - recinto.ocupados) >= espacoNecessario;
    }
}

export { RecintosZoo as RecintosZoo };
















