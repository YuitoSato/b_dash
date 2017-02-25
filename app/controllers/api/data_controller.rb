class Api::DataController < ApplicationController
  def index
    @data = Datum.all.group(:area, :middle_category).count.reduce({}) do |result, (key, value)|
      area, middle_category = key
      result[area] ||= {}
      result[area][middle_category] = value
      result
    end
  end
end
