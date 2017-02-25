require "csv"

CSV.foreach('db/b_dash.csv') do |row|
    Datum.create(:order_time => row[0],
                 :original_product_id => row[1],
                 :age => row[2],
                 :price => row[3],
                 :age_range => row[4],
                 :prefecture => row[5],
                 :area => row[6],
                 :tab => row[7],
                 :big_category => row[8],
                 :middle_category => row[9],
                 :color => row[10],
                 :favorite => row[11],
                 :review => row[12]
                )
end
