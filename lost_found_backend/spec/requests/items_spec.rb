require 'rails_helper'

RSpec.describe "ItemsController", type: :request do
  let!(:user) do
    User.create!(
      name: "Alice",
      email: "alice@example.com",
      password: "password",
      role: "student"
    )
  end

  let!(:item) do
    Item.create!(
      user: user,
      title: "Lost Wallet",
      description: "Brown leather wallet",
      status: "lost",
      location: "Library",
      category: "Personal Item",
      date_found: Date.today,
      share_contact: true
    )
  end

  let(:auth_headers) do
    token = JsonWebToken.encode(user_id: user.id)
    { "Authorization" => "Bearer #{token}" }
  end

  describe "GET /items" do
    it "returns a list of items" do
      get "/items"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)
    end
  end

  describe "GET /items/:id" do
    it "returns the item details" do
      get "/items/#{item.id}"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["title"]).to eq("Lost Wallet")
    end
  end

  describe "POST /items" do
    it "creates a new item" do
      post "/items", headers: auth_headers, params: {
        item: {
          title: "Phone",
          description: "Black Samsung phone",
          status: "found",
          location: "Cafeteria",
          category: "Electronics",
          date_found: Date.today,
          share_contact: false
        }
      }

      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)["title"]).to eq("Phone")
    end

    it "returns validation errors for missing data" do
      post "/items", headers: auth_headers, params: {
        item: {
          title: "",
          description: "",
          status: "",
          location: "",
          category: "",
          date_found: "",
          share_contact: nil
        }
      }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)["errors"]).to be_an(Array)
    end
  end

  describe "PATCH /items/:id" do
    it "updates the item if user is owner" do
      patch "/items/#{item.id}", headers: auth_headers, params: {
        item: { title: "Updated Wallet" }
      }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["title"]).to eq("Updated Wallet")
    end

    it "prevents update by unauthorized user" do
      other_user = User.create!(name: "Hacker", email: "hacker@example.com", password: "password", role: "student")
      token = JsonWebToken.encode(user_id: other_user.id)
      bad_headers = { "Authorization" => "Bearer #{token}" }

      patch "/items/#{item.id}", headers: bad_headers, params: {
        item: { title: "Hacked Title" }
      }

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "DELETE /items/:id" do
    it "deletes the item if user is owner" do
      delete "/items/#{item.id}", headers: auth_headers
      expect(response).to have_http_status(:no_content)
      expect(Item.find_by(id: item.id)).to be_nil
    end
  end
end
