require 'rails_helper'

RSpec.describe "AuthController", type: :request do
  let!(:user) do
    User.create!(
      name: "Test User",
      email: "test@example.com",
      password: "password",
      role: "student"
    )
  end

  describe "POST /login" do
    context "with valid credentials" do
      it "returns a JWT token and user data" do
        post "/login", params: { email: "test@example.com", password: "password" }

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json).to have_key("token")
        expect(json["user"]["email"]).to eq("test@example.com")
        expect(json["user"]["name"]).to eq("Test User")
      end
    end

    context "with invalid password" do
      it "returns unauthorized error" do
        post "/login", params: { email: "test@example.com", password: "wrongpassword" }

        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)["error"]).to eq("Invalid email or password")
      end
    end

    context "with missing credentials" do
      it "returns bad request when email is missing" do
        post "/login", params: { password: "password" }

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)["error"]).to eq("Email and password required")
      end

      it "returns bad request when password is missing" do
        post "/login", params: { email: "test@example.com" }

        expect(response).to have_http_status(:bad_request)
        expect(JSON.parse(response.body)["error"]).to eq("Email and password required")
      end
    end

    context "with non-existent user" do
      it "returns unauthorized" do
        post "/login", params: { email: "ghost@example.com", password: "password" }

        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)["error"]).to eq("Invalid email or password")
      end
    end
  end
end
