class Api::DataController < ApplicationController
  def index
    @data = Datum.all
  end
end
