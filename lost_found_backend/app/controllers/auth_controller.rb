class AuthController < ApplicationController
 
  skip_before_action :authorize_request, only: [:login]

  def login
    email = params[:email] || params.dig(:user, :email)
    password = params[:password] || params.dig(:user, :password)

    unless email.present? && password.present?
      return render json: { error: "Email and password required" }, status: :bad_request
    end

    user = User.find_by(email: email.downcase)

    if user&.authenticate(password)
      token = JsonWebToken.encode(user_id: user.id)
      render json: {
        user: user.slice(:id, :email, :name, :role),
        token: token
      }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  rescue => e
    Rails.logger.error("Login error: #{e.message}\n#{e.backtrace.join("\n")}")
    render json: { error: "Server error. Please try again." }, status: :internal_server_error
  end
end
