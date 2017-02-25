Rails.application.routes.draw do
  root 'top#index'
  get 'get_data', to: 'api/slider/data#index'
end
