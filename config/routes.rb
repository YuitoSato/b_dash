Rails.application.routes.draw do
  root 'top#index'
  namespace :api do
    resources :data
  end
  get 'get_data', to: 'api/slider/data#index'

end
