class ContactsController < ApplicationController
  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: { message: "Message sent successfully" }, status: :created
    else
      render json: { errors: contact.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def contact_params
    params.permit(:name, :email, :message)
  end
end
