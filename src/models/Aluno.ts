import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

//Criando classe Aluno, que estende Model
//Essa classe serve apenas para definir a estrutura dos dados que essa entidade terá no TypeScript
//Ou seja, define a tipagem dos atributos mas ainda não os conecta ao sequelize

export class Aluno extends Model{
    public id!: number;
    public nome!: string;
    public email!: string;
    public matricula!: string;
}

// Aqui é onde informamos ao sequelize como a tabela "alunos" deve ser criada
// O primeiro parametro define os atributos da tabela e suas regras(tipos, se são unicos, se podem ser nulos, etc.).
// O segundo parametro configurações gerais da tabela, como nome e timestamps.

Aluno.init(
    {
        //definiçãom dos atributos da tabela no banco de daos
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING, //define como string(varchar no banco)
            allowNull: false, //não pode ser nulo
        },
        email: {
            type: DataTypes.STRING,
            unique: true, // email deve ser único
            allowNull: false,
        },
        matricula: {
            type: DataTypes.STRING,
            unique: true, //matricula tbm deve ser unica
            allowNull: false, 
        }
    },
    {
        sequelize, //passamos a instância do Sequelize, conectando essa model ao banco
        tableName: "alunos",//define o nome da tabela
        timestamps: true, // como não quermos colunas de "createdAT" e "updatedAt", desativamos timestamps
        paranoid: true,
    }
)