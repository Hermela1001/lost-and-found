require 'rails_helper'

RSpec.describe ItemsController, type: :request do
  let(:user) { create(:user) }
  let(:item) { create(:item, user: user) }

  before { sign_in user } # Or use JWT setup if applicable

  describe "GET /items" do
    it "returns a list of items" do
      get "/items"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /items/:id" do
    it "returns the item" do
      get "/items/#{item.id}"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["title"]).to eq(item.title)
    end
  end

  describe "POST /items" do
    it "creates a new item" do
      expect {
        post "/items", params: {
          item: {
            title: "Phone",
            status: "Lost",
            location: "Library",
            category: "Electronics",
            description: "Black iPhone",
            user_id: user.id
          }
        }, headers: auth_headers(user)
      }.to change(Item, :count).by(1)
    end
  end
end
