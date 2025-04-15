import { Model, DataTypes } from "sequelize";
import { Aluno } from "./Aluno";
import { Disciplina } from "./Disciplina";
import { sequelize } from "../instances/mysql";

export class Nota extends Model {
    public id!: number;
    public alunoId!: number;
    public disciplinaId!: number;
    public nota!: number;
    public data_avaliacao!: Date;
}

Nota.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        alunoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Aluno,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        disciplinaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Disciplina,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        nota: {
            type: DataTypes.DECIMAL,   
        },
        data_avaliacao: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: "notas"
    }
)