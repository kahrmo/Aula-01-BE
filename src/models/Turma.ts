import { DataTypes, Model } from "sequelize";
import { Curso } from "./Curso";
import { sequelize } from "../instances/mysql";

export class Turma extends Model {
    public id!: number;
    public nome!: string;
    public periodo!: string;
    public id_curso!: number;
}

Turma.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        periodo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_curso: {
            type: DataTypes.INTEGER,
            allowNull: false,
                    references: {
                        model: Curso,
                        key: "id",
                    },
                    onDelete: "CASCADE",    

        },
    },
    {
        sequelize,
        tableName: "turmas",
        timestamps: true,
        paranoid: true,
    }
)