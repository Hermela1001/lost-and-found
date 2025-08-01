FactoryBot.define do
  factory :item do
    title { "Lost Phone" }
    description { "iPhone 13" }
    location { "Cafeteria" }
    category { "Lost" }
    association :user
  end
end
