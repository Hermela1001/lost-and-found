class ItemsController < ApplicationController
  skip_before_action :authorize_request, only: [:index, :show]
  before_action :set_item, only: [:show, :update, :destroy]
  before_action :authorize_owner!, only: [:update, :destroy]

  def index
    items = Item.with_attached_image.order(created_at: :desc)
    render json: items.map { |item| item_json(item) }
  end

  def show
    render json: item_json(@item)
  end

  def create
    item = current_user.items.build(item_params)
    if item.save
      render json: item_json(item), status: :created
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render json: item_json(@item)
    else
      render json: { errors: @item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @item.destroy
    head :no_content
  end

  private

  def set_item
    @item = Item.find_by(slug: params[:id]) || Item.find_by(id: params[:id])
    return render json: { error: "Item not found" }, status: :not_found unless @item
  end

  def authorize_owner!
    unless @item.user_id == current_user&.id
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  def item_params
    params.require(:item).permit(
      :title, :description, :status, :location,
      :category, :date_found, :share_contact, :image
    )
  end

  def item_json(item)
    {
      id: item.id,
      slug: item.slug,
      title: item.title,
      description: item.description,
      status: item.status,
      location: item.location,
      category: item.category,
      date_found: item.date_found,
      share_contact: item.share_contact,
      user_id: item.user_id,
      image_url: item.image_url
    }
  end
end
