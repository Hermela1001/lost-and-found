# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    name { "John Doe" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password" }
    password_confirmation { "password" }
    role { "student" }
  end

  factory :admin, class: 'User' do
    name { "Admin User" }
    email { "admin@example.com" }
    password { "adminpass" }
    password_confirmation { "adminpass" }
    role { "admin" }
  end
end
