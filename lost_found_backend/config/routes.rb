Rails.application.routes.draw do
  post "/login", to: "auth#login"
  post "/contacts", to: "contacts#create"

  root to: proc { [200, {}, ["Lost and Found API is running."]] }

  resources :items, defaults: { format: :json }, only: [:index, :show, :create, :update, :destroy]

  # 👤 User-specific endpoint for dashboard
  get "/me/items", to: "items#user_items", defaults: { format: :json }
end
