require 'rails_helper'

RSpec.describe Item, type: :model do
  let(:user) { User.create(name: "John Doe", email: "john@example.com", role: "student", password: "password") }

  it "is valid with valid attributes" do
    item = Item.new(
      user: user,
      title: "Lost Backpack",
      description: "A red backpack left in the library.",
      status: "lost",
      category: "bag",
      location: "Main Library",
      date_found: Date.today,
      share_contact: true
    )
    expect(item).to be_valid
  end

  it "is invalid without a title" do
    item = Item.new(title: nil)
    item.validate
    expect(item.errors[:title]).to include("can't be blank")
  end

  it "is invalid with a status not in the list" do
    item = Item.new(
      user: user,
      title: "Lost",
      description: "desc",
      status: "missing",
      category: "cat",
      location: "loc",
      date_found: Date.today,
      share_contact: true
    )
    item.validate
    expect(item.errors[:status]).to include("missing is not a valid status")
  end

  it "is invalid without share_contact" do
    item = Item.new(share_contact: nil)
    item.validate
    expect(item.errors[:share_contact]).to include("is not included in the list")
  end

  

end
