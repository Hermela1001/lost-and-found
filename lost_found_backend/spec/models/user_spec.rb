require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with valid attributes" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "is not valid without a username" do
    user = build(:user, username: nil)
    expect(user).not_to be_valid
  end

  it "has many items" do
    assoc = described_class.reflect_on_association(:items)
    expect(assoc.macro).to eq :has_many
  end
end
