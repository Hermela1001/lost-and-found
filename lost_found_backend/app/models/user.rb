class User < ApplicationRecord
  has_secure_password

  has_many :items, dependent: :destroy
  
  validates :email, presence: true, uniqueness: true
  validates :name, :role, presence: true
  validates :role, inclusion: { in: %w[admin student] }

  # Helper methods for role checks
  def admin?
    role == 'admin'
  end

  def student?
    role == 'student'
  end
end