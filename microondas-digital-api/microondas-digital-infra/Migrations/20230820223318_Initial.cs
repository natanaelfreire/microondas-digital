using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace microondas_digital_infra.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    id = table.Column<string>(type: "TEXT", nullable: false),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    senha = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "microondas",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    minutos = table.Column<int>(type: "INTEGER", nullable: false),
                    segundos = table.Column<int>(type: "INTEGER", nullable: false),
                    potencia = table.Column<int>(type: "INTEGER", nullable: false),
                    hora_inicio = table.Column<DateTime>(type: "TEXT", nullable: true),
                    hora_pausa = table.Column<DateTime>(type: "TEXT", nullable: true),
                    id_usuario = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_microondas", x => x.id);
                    table.ForeignKey(
                        name: "FK_microondas_usuario_id_usuario",
                        column: x => x.id_usuario,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "programa_aquecimento",
                columns: table => new
                {
                    id = table.Column<string>(type: "TEXT", nullable: false),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    alimento = table.Column<string>(type: "TEXT", nullable: true),
                    minutos = table.Column<int>(type: "INTEGER", nullable: false),
                    segundos = table.Column<int>(type: "INTEGER", nullable: false),
                    potencia = table.Column<int>(type: "INTEGER", nullable: false),
                    instrucoes = table.Column<string>(type: "TEXT", nullable: true),
                    caractere = table.Column<char>(type: "TEXT", nullable: true),
                    id_usuario = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_programa_aquecimento", x => x.id);
                    table.ForeignKey(
                        name: "FK_programa_aquecimento_usuario_id_usuario",
                        column: x => x.id_usuario,
                        principalTable: "usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_microondas_id_usuario",
                table: "microondas",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_programa_aquecimento_id_usuario",
                table: "programa_aquecimento",
                column: "id_usuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "microondas");

            migrationBuilder.DropTable(
                name: "programa_aquecimento");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
