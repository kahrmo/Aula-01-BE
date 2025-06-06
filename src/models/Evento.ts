import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export class Evento extends Model{
    public id!: number;
    public nome!: string;
    public local!: string;
    public data!: string;
}

Evento.init(
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
        local: {
            type: DataTypes.STRING,
            unique: false, // email deve ser único
            allowNull: false,
        },
        data: {
            type: DataTypes.STRING,
            unique: false, //matricula tbm deve ser unica
            allowNull: false, 
        }
    },
    {
        sequelize, //passamos a instância do Sequelize, conectando essa model ao banco
        tableName: "evento",//define o nome da tabela
        timestamps: true, // como não quermos colunas de "createdAT" e "updatedAt", desativamos timestamps
        paranoid: true,
    }
)