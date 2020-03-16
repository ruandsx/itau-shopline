# itau-shopline

### Versão NodeJS da antiga itaucripto.dll. Baseado na implementação em php
O Itaú Shopline é uma plataforma rápida e segura de recebimentos destinada a empresas que precisam realizar vendas pela internet, e que coloca à disposição de seus clientes diversas formas de pagamento.

Até o momento, essa lib gera um código criptografado, para ser usado na geração de pagamentos através do Itaú Shopline

# Relatos de Bugs, Dúvidas e Sugestões

Caso tenha algum dúvida, queira relatar um bug ou até mesmo sugerir uma melhoria, crie uma issue nesse repositório.

Caso queira ajudar na implementação, fique à vontade para contribuir. Abra um pull request e ele será analisado assim que possível!

# Como instalar

Utilizando o gerenciador de pacotes npm, instale da seguinte maneira :

```
npm install itau-shopline
```

# Como usar

Essa lib foi desenvolvida pensando na utilização no backend com NodeJS.

```javascript

const ItauCripto = require('itau-shopline');

const codigo = ItauCripto.geraDados(
 'AAAAAAAAAA', // código de acesso da empresa
 'PED01', // identificacao do pedido
 '300.10', // valor do pagamento
 '', // observacao
 'AAAAAAAAAA', // chave de acesso da empresa
 'Nome e Sobrenome Aqui', // nome do pagador 
 '01', // tipo do documento (formato: "01")
 '12345678910', // documento do pagador
 'Rua do Pagador', // endereço do pagador
 'Bairro do Pagador', // bairro do pagador
 '12345678', // cep do sacado 
 'Cidade do Pagador', // cidade do pagador
 'Estado', // estado do sacado
 '15032020', // data de vencimento (formato: "15032020")
 '', // url de retorno
 '', // observacao adicional 1
 '', // observacao adicional 1
 '', // observacao adicional 1
 ); 

console.log(codigo); // nesse momento a variável codigo deve conter uma hash ou uma string com algum erro relacionado ao preenchimento dos dados 

```

No front-end utilize um form, como recomendado no material do Itaú.

```html
<form method="post" action="https://shopline.itau.com.br/shopline/shopline.aspx" target="SHOPLINE">
    <input type="hidden" name="DC" value="CODIGO_GERADO_AQUI" />
</form>

```
Obs.: o nome do Input tem que ser “DC” pois os dados são recebidos a partir de um
request com este nome.

Para mais informações e implementações alternativas, acesse o PDF disponível na pasta 'documents'

# Changelog

 - v1.0.0 - 15 de março de 2020
   - Classe traduzida para js.
 - v1.0.1 - 15 de março de 2020
   - Melhoria na organização dos arquivos.
 - v1.0.2 - 15 de março de 2020
   - Adicionadas informações sobre o projeto.

# Autor

 [Ruan Xavier](https://ruandsx.github.io/website/)