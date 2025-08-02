require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      user = User.new(name: "John", email: "john@example.com", role: "student", password: "password")
      expect(user).to be_valid
    end

    it "is invalid without an email" do
      user = User.new(name: "John", email: nil, role: "student", password: "password")
      expect(user).not_to be_valid
    end

    it "is invalid without a name" do
      user = User.new(name: nil, email: "john@example.com", role: "student", password: "password")
      expect(user).not_to be_valid
    end

    it "is invalid without a role" do
      user = User.new(name: "John", email: "john@example.com", role: nil, password: "password")
      expect(user).not_to be_valid
    end

    it "is invalid with a duplicate email" do
      User.create!(name: "Jane", email: "jane@example.com", role: "admin", password: "password")
      user = User.new(name: "Jane2", email: "jane@example.com", role: "student", password: "password")
      expect(user).not_to be_valid
    end

    it "is invalid with a role outside admin or student" do
      user = User.new(name: "John", email: "john@example.com", role: "guest", password: "password")
      expect(user).not_to be_valid
    end
  end

  describe "associations" do
    it "has many items and deletes them when user is destroyed" do
      user = User.create!(name: "Alice", email: "alice@example.com", role: "admin", password: "password")

      user.items.create!(
        title: "Lost Bag",
        description: "Black backpack",
        status: "lost",
        category: "bag",
        location: "Library",
        date_found: Date.today,
        share_contact: true
      )

      expect { user.destroy }.to change { Item.count }.by(-1)
    end
  end

  describe "role helpers" do
    it "#admin? returns true if role is admin" do
      user = User.new(role: "admin")
      expect(user.admin?).to be true
    end

    it "#student? returns true if role is student" do
      user = User.new(role: "student")
      expect(user.student?).to be true
    end
  end
end
