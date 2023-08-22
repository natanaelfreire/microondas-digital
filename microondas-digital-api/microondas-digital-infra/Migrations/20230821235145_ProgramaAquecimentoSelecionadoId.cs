using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace microondas_digital_infra.Migrations
{
    /// <inheritdoc />
    public partial class ProgramaAquecimentoSelecionadoId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "id_programa_aquecimento_selecionado",
                table: "microondas",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "id_programa_aquecimento_selecionado",
                table: "microondas");
        }
    }
}
