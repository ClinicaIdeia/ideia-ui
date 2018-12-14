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
  cargo: string;
  endereco = new Endereco();
  empresas = Array<Empresa>();
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
}

export class SenhaReiniciar {
  email: string;
}



