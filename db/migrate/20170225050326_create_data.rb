class CreateData < ActiveRecord::Migration
  def change
    create_table :data do |t|
      t.datetime :order_time
      t.integer :original_product_id
      t.integer :age
      t.integer :price
      t.string :age_range
      t.string :prefecture
      t.string :area
      t.string :tab
      t.string :big_category
      t.string :middle_category
      t.string :color
      t.integer :favorite
      t.integer :review
    end
  end
end
