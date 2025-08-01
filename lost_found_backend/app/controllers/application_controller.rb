class ApplicationController < ActionController::API
  before_action :authorize_request

  private

  def authorize_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    decoded = JsonWebToken.decode(token) if token
    @current_user = User.find_by(id: decoded[:user_id]) if decoded
  rescue JWT::DecodeError, JWT::VerificationError, JWT::ExpiredSignature, StandardError
    render json: { errors: 'Unauthorized or invalid token' }, status: :unauthorized
  end

  def current_user
    @current_user
  end

  def authorize_admin!
    render json: { error: 'Access denied' }, status: :forbidden unless @current_user&.admin?
  end
end
