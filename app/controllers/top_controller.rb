class TopController < ApplicationController

  def index
    @data = Datum.all
  end

end
