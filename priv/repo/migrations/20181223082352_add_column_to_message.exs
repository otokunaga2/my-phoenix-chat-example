defmodule Chat.Repo.Migrations.AddColumnToMessage do
  use Ecto.Migration

  def change do
    alter table(:messages) do
      add :user_id, :string
    end
  end
end
