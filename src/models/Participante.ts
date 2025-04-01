import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Participante extends Model{
    public id!: number;
    public nome!: string;
    public cpf!: string;
    public telefone!: number;
}

Participante.init(
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
        cpf: {
            type: DataTypes.STRING,
            unique: true, // email deve ser único
            allowNull: false,
        },
        telefone: {
            type: DataTypes.INTEGER,
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