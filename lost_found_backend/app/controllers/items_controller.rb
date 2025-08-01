class ItemsController < ApplicationController
  skip_before_action :authorize_request, only: [:index, :show]

  def index
    items = Item.with_attached_image.order(created_at: :desc)
    render json: items.map { |item| item_json(item) }
  end

  def show
    item = Item.find(params[:id])
    render json: item_json(item)
  end

  def create
    item = current_user.items.build(item_params)
    if item.save
      render json: item_json(item), status: :created
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def item_params
    params.permit(
      :title, :description, :status, :location,
      :category, :date_found, :share_contact, :image
    )
  end

  def item_json(item)
    {
      id: item.id,
      title: item.title,
      description: item.description,
      status: item.status,
      location: item.location,
      category: item.category,
      date_found: item.date_found,
      share_contact: item.share_contact,
      user_id: item.user_id,
      image_url: item.image.attached? ? url_for(item.image) : nil
    }
  end
end
