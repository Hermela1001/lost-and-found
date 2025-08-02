require 'rails_helper'

RSpec.describe Contact, type: :model do
  it "is valid with valid attributes" do
    contact = Contact.new(
      name: "Jane Doe",
      email: "jane@example.com",
      message: "I lost my ID card near the cafeteria."
    )
    expect(contact).to be_valid
  end

  it "is invalid without a name" do
    contact = Contact.new(name: nil, email: "jane@example.com", message: "Message")
    contact.validate
    expect(contact.errors[:name]).to include("can't be blank")
  end

  it "is invalid without an email" do
    contact = Contact.new(name: "Jane", email: nil, message: "Message")
    contact.validate
    expect(contact.errors[:email]).to include("can't be blank")
  end

  it "is invalid without a message" do
    contact = Contact.new(name: "Jane", email: "jane@example.com", message: nil)
    contact.validate
    expect(contact.errors[:message]).to include("can't be blank")
  end
end
