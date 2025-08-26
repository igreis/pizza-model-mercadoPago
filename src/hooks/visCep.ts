export async function verifyCep(cep: string) {
    const cepFormat = cep.replace(/\D/g, '');

    if (cepFormat && cepFormat.length !== 8) {
        throw new Error('CEP inválido');
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepFormat}/json/`);
    const data = await response.json();

    if(data.erro) {
        throw new Error('CEP inválido');
    }

    return {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      };

}