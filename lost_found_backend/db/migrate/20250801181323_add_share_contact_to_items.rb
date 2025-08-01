class AddShareContactToItems < ActiveRecord::Migration[8.0]
  def change
    add_column :items, :share_contact, :boolean
  end
end
