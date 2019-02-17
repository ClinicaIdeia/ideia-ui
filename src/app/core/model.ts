export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Contato {
  codigo: number;
  nome: string;
  telefone: string;
  telefoneFixo: string;
  email: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}

export class Categoria {
  codigo: number;
}

export class Empresa {
  codigo: number;
  nome: string;
  cnpj: string;
  contatos: Array<Contato>;
  endereco = new Endereco();
  ativa: Boolean
}
export class Funcionario {
  codigo: number;
  nome: string;
  rg: string;
  cpf: string;
  sexo: string;
  estadoCivil: string;
  escolaridade: string;
  naturalidade: string;
  dataNascimento: string;
  email: string;
  matricula: string;
  telefone: string;
  telefoneFixo: string;
  cargo: string;
  endereco = new Endereco();
  empresas = Array<Empresa>();
  idade: number;
  anexo: string;
  urlAnexo: string;
}

export class Horario {
 codigo: number;
 horaExame: string;
 maximoPermitido: number;
 restante: number;
 disponivel: Boolean;
 avulso: Boolean;
}

export class Motivo {
  codigo: number;
  descricao: string
  observacao: string;
}

export class Agenda {
  codigo: number;
  diaAgenda: Date;
  horarios: Array<Horario>;
  diasCopia: Array<Date>;
  observacao: string;
}

export class Agendamento {
  codigo: number;
  codHorario: number;
  horaExame: Date;
  observacao: string;
  motivo = new Motivo();
  agenda = new Agenda();
  funcionario = new Funcionario();
  empresa = new Empresa();
  trabalhoArmado = false;
  avulso = false;
}

export class Permissao {
  codigo: number;
  descricao: string;
}

export class Usuario {
  codigo: number;
  nome: string;
  email: string;
  permissoes: Array<Permissao>;
  empresa = new Empresa();
  anexo: string;
  urlAnexo: string;

}

export class SenhaReiniciar {
  email: string;
}

export class SenhaAlterar {
  senhaNova: string;
  confirmacao: string;
}

export class Aptidao {  
  codigo: number;
  apto: boolean;
  descricao: string;

}

export class Laudo {
  codigo: number;
  agendamento = new Agendamento();
  funcionario = new Funcionario();
  aptidoes: Array<Aptidao>;
  observacao: string;
  motivo: Motivo;
  dataExame: Date;
  dataEmissao: Date;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export class Anexo {
  nome: string;
  url: string;
}


