require 'rails_helper'

RSpec.describe Contact, type: :model do
  it "is valid with valid attributes" do
    contact = build(:contact)
    expect(contact).to be_valid
  end

  it "is invalid without a name" do
    contact = build(:contact, name: nil)
    expect(contact).not_to be_valid
  end

  it "is invalid without an email" do
    contact = build(:contact, email: nil)
    expect(contact).not_to be_valid
  end
end
