require 'rails_helper'

RSpec.describe "ContactsController", type: :request do
  describe "POST /contacts" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          name: "John Doe",
          email: "john@example.com",
          message: "This is a test message."
        }
      end

      it "creates a new contact and returns success message" do
        post "/contacts", params: valid_params

        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)["message"]).to eq("Message sent successfully")
        expect(Contact.count).to eq(1)
      end
    end

    context "with missing parameters" do
      it "returns error when name is missing" do
        post "/contacts", params: { email: "john@example.com", message: "Missing name" }

        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)["errors"]).to include("Name can't be blank")
      end

      it "returns error when email is missing" do
        post "/contacts", params: { name: "John", message: "Missing email" }

        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)["errors"]).to include("Email can't be blank")
      end

      it "returns error when message is missing" do
        post "/contacts", params: { name: "John", email: "john@example.com" }

        expect(response).to have_http_status(:unprocessable_content)
        expect(JSON.parse(response.body)["errors"]).to include("Message can't be blank")
      end
    end
  end
end
