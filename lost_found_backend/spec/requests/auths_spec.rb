require 'rails_helper'

RSpec.describe AuthController, type: :request do
  let(:user) { create(:user, username: "johndoe", password: "password") }

  describe "POST /login" do
    it "authenticates the user" do
      post "/login", params: { username: "johndoe", password: "password" }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to have_key("token")
    end
  end
end
