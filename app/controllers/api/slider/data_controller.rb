class Api::Slider::DataController < ApplicationController

  def index
    selected_month = params[:month]
    data = Datum.all.select{ |data| data.order_time.try(:mon) == selected_month.to_i }
    return data.to_json
  end

end
