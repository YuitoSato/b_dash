json.data(@data) { |d| json.extract!(d, :id, :order_time, :original_product_id, :age, :price, :age_range, :prefecture, :area, :tab, :big_category, :middle_category, :color, :favorite, :review) }
