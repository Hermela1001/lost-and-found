class Item < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  validates :title, presence: true, length: { maximum: 100 }
  validates :description, presence: true, length: { maximum: 1000 }
  validates :status, presence: true, inclusion: {
    in: %w[lost found pending verified matched],
    message: "%{value} is not a valid status"
  }
  validates :category, presence: true
  validates :location, presence: true
  validates :date_found, presence: true
  validates :share_contact, inclusion: { in: [true, false] }

  validate :date_found_cannot_be_in_the_future

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

  private

  def date_found_cannot_be_in_the_future
    if date_found.present? && date_found > Date.today
      errors.add(:date_found, "can't be in the future")
    end
  end
end
