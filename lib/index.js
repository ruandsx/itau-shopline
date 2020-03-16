class ItauCripto {
  constructor() {
    this.sbox = [];
    this.key = [];
    this.CHAVE_ITAU = "SEGUNDA12345ITAU";
    this.TAM_COD_EMP = 26;
    this.TAM_CHAVE = 16;
  }

  isNumber(n) {
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  tiraAcento(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  preencheZero(paramString, paramInt) {
    let str = `${paramString}`;
    while (str.length < paramInt) {
      str = `0${str}`;
    }
    return str.substr(0, paramInt);
  }

  preencheBranco(paramString, paramInt) {
    let str = `${paramString}`;
    while (str.length < paramInt) {
      str += " ";
    }
    return str.substr(0, paramInt);
  }

  formataCEP(string) {
    return string
      .replace(".", "")
      .replace(".", "")
      .replace("-", "");
  }

  inicializa(string) {
    const m = string.length;
    for (let j = 0; j <= 255; j += 1) {
      this.key[j] = string.substr(j % m, 1);
      this.sbox[j] = j;
    }
    let k = 0;
    let i = 0;
    for (let j = 0; j <= 255; j += 1) {
      k = (k + this.sbox[j] + this.key[j].charCodeAt(0)) % 256;
      i = this.sbox[j];
      this.sbox[j] = this.sbox[k];
      this.sbox[k] = i;
    }
  }

  randomDouble() {
    const random1 = Math.random() * (999999999 - 0) + 0;
    const random2 = (random1 / 1000000000).toFixed(10);
    return random2;
  }

  converte(paramString) {
    let c = String.fromCharCode(Math.floor(26.0 * this.randomDouble() + 65.0));
    let str = `${c}`;
    for (let i = 0; i < paramString.length; i += 1) {
      const k = paramString.substr(i, 1);
      const j = k.charCodeAt(0);
      str += j;
      c = String.fromCharCode(Math.floor(26.0 * this.randomDouble() + 65.0));
      str += c;
    }
    return str;
  }

  algoritmo(string1, string2) {
    string2 = string2.toUpperCase();
    let k = 0;
    let m = 0;
    let str = "";
    this.inicializa(string2);
    for (let j = 1; j <= string1.length; j += 1) {
      k = (k + 1) % 256;
      m = (m + this.sbox[k]) % 256;
      const i = this.sbox[k];
      this.sbox[k] = this.sbox[m];
      this.sbox[m] = i;
      const n = this.sbox[(this.sbox[k] + this.sbox[m]) % 256];
      const i1 = string1.substr(j - 1, 1).charCodeAt(0) ^ n;
      str += String.fromCharCode(i1);
    }
    return str;
  }

  geraCripto(paramString1, paramString2, paramString3) {
    if (paramString1.length !== this.TAM_COD_EMP) {
      return "Erro: tamanho do codigo da empresa diferente de 26 posições.";
    }
    if (paramString3.length !== this.TAM_CHAVE) {
      return "Erro: tamanho da chave da chave diferente de 16 posições.";
    }
    paramString2 = paramString2.trim();
    if (paramString2 === "") {
      return "Erro: código do sacado inválido.";
    }
    const str1 = this.algoritmo(paramString2, paramString3);
    const str2 = this.algoritmo(paramString1 + str1, this.CHAVE_ITAU);
    return this.converte(str2);
  }

  geraDados(
    paramString1, // codigo da empresa
    paramString2, // pedido
    paramString3, // valor
    paramString4, // observacao
    paramString5, // chave de acesso da empresa
    paramString6, // nome do sacado
    paramString7, // tipo do documento (vide manual do desenvolvedor do itau)
    paramString8, // documento do sacado
    paramString9, // endereco do sacado
    paramString10, // bairro do sacado
    paramString11, // cep do sacado
    paramString12, // cidade do sacado
    paramString13, // estado do sacado
    paramString14, // data de vencimento do boleto
    paramString15, // url de retorno
    paramString16, // obs Adicional 1
    paramString17, // obs Adicional 2
    paramString18 // obs Adicional 3
  ) {
    paramString1 = paramString1.toUpperCase();
    paramString5 = paramString5.toUpperCase();
    if (paramString1.length !== this.TAM_COD_EMP) {
      return "Erro: tamanho do codigo da empresa diferente de 26 posições.";
    }
    if (paramString5.length !== this.TAM_CHAVE) {
      return "Erro: tamanho da chave da chave diferente de 16 posições.";
    }
    if (paramString2.length < 1 || paramString2.length > 8) {
      return "Erro: número do pedido inválido.";
    }
    if (this.isNumber(paramString2)) {
      paramString2 = this.preencheZero(paramString2, 8);
    } else {
      return "Erro: numero do pedido não é numérico.";
    }
    if (paramString3.length < 1 || paramString3.length > 11) {
      return "Erro: valor da compra inválido.";
    }
    const i = paramString3.indexOf(",") > -1;
    if (i) {
      const str3 = paramString3.substr(i + 1);
      if (!this.isNumber(str3)) {
        return "Erro: valor decimal não é numérico.";
      }
      if (str3.length !== 2) {
        return "Erro: valor decimal da compra deve possuir 2 posições após a virgula.";
      }
      paramString3 = paramString3.substr(0, paramString3.length - 3) + str3;
    } else {
      if (!this.isNumber(paramString3)) {
        return "Erro: valor da compra não é numérico.";
      }
      if (paramString3.length > 8) {
        return "Erro: valor da compra deve possuir no máximo 8 posições antes da virgula.";
      }
      paramString3 += "00";
    }
    paramString3 = this.preencheZero(paramString3, 10);
    paramString7 = paramString7.trim();
    if (paramString7 !== "02" && paramString7 !== "01" && paramString7 !== "") {
      return "Erro: código de inscrição inválido.";
    }
    if (
      paramString8 !== "" &&
      !this.isNumber(paramString8) &&
      paramString8.length > 14
    ) {
      return "Erro: número de inscrição inválido.";
    }
    if (
      paramString11 !== "" &&
      (!this.isNumber(paramString11) ||
        this.formataCEP(paramString11).length !== 8)
    ) {
      return "Erro: cep inválido.";
    }
    if (
      paramString14 !== "" &&
      (!this.isNumber(paramString14) || paramString14.length !== 8)
    ) {
      return "Erro: data de vencimento inválida.";
    }
    if (paramString16.length > 60) {
      return "Erro: observação adicional 1 inválida.";
    }
    if (paramString17.length > 60) {
      return "Erro: observação adicional 2 inválida.";
    }
    if (paramString18.length > 60) {
      return "Erro: observação adicional 3 inválida.";
    }
    // Retira os acentos
    paramString4 = this.tiraAcento(paramString4);
    paramString6 = this.tiraAcento(paramString6);
    paramString9 = this.tiraAcento(paramString9);
    paramString10 = this.tiraAcento(paramString10);
    paramString12 = this.tiraAcento(paramString12);
    paramString16 = this.tiraAcento(paramString16);
    paramString17 = this.tiraAcento(paramString17);
    paramString18 = this.tiraAcento(paramString18);
    paramString4 = this.preencheBranco(paramString4, 40);
    paramString6 = this.preencheBranco(paramString6, 30);
    paramString7 = this.preencheBranco(paramString7, 2);
    paramString8 = this.preencheBranco(paramString8, 14);
    paramString9 = this.preencheBranco(paramString9, 40);
    paramString10 = this.preencheBranco(paramString10, 15);
    paramString11 = this.preencheBranco(paramString11, 8);
    paramString12 = this.preencheBranco(paramString12, 15);
    paramString13 = this.preencheBranco(paramString13, 2);
    paramString14 = this.preencheBranco(paramString14, 8);
    paramString15 = this.preencheBranco(paramString15, 60);
    paramString16 = this.preencheBranco(paramString16, 60);
    paramString17 = this.preencheBranco(paramString17, 60);
    paramString18 = this.preencheBranco(paramString18, 60);
    const str1 = this.algoritmo(
      paramString2 +
        paramString3 +
        paramString4 +
        paramString6 +
        paramString7 +
        paramString8 +
        paramString9 +
        paramString10 +
        paramString11 +
        paramString12 +
        paramString13 +
        paramString14 +
        paramString15 +
        paramString16 +
        paramString17 +
        paramString18,
      paramString5
    );
    const str2 = this.algoritmo(paramString1 + str1, this.CHAVE_ITAU);
    return this.converte(str2);
  }
}
module.exports = new ItauCripto();
