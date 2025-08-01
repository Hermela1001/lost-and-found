require 'rails_helper'

RSpec.describe Item, type: :model do
  it "is valid with valid attributes" do
    item = build(:item)
    expect(item).to be_valid
  end

  it "is not valid without a title" do
    item = build(:item, title: nil)
    expect(item).not_to be_valid
  end

  it "is not valid without a status" do
    item = build(:item, status: nil)
    expect(item).not_to be_valid
  end

  it "belongs to a user" do
    assoc = described_class.reflect_on_association(:user)
    expect(assoc.macro).to eq :belongs_to
  end
end
