
export class Usuario {

    public id: number;


    constructor(
        public id_serv     :number,
        public name        :String,
        public sobrenome   :String,
        public email       :String,
        public photo       :String,
        public tp_pessoa   :String, // cupom que ele se cadastrou
        public cpf         :String, // aqui fica a linguagem
        public cnpj        :String, // aqui fica o cupom
        public cep         :String,
        public endereco    :String,
        public numero      :String,
        public complemento :String,
        public bairro      :String,
        public cidade      :String,
        public estado      :String,
        public telefone    :String,
        public celular     :String,
        public usuario     :String,
        public logado      :String,
        public token       :String,

    ) {
        this.id = new Date().getTime();
    }

}
