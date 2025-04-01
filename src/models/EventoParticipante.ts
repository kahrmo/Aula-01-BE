import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Evento } from "./Evento";
import { Participante } from "./Participante";

export class EventoParticipante extends Model {
    public eventoId!: number;
    public participanteId!: number;
}

EventoParticipante.init(
    {
        eventoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Evento,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        participanteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Participante,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        tableName: "evento_participante",
        timestamps: false,
    }
)