class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def new
  end

  def create
    Group.new(group_params)
  end

  def edit
  end

  def update
    @group.update(group_params)
  end

  private
  def group_params
    params.require(:group).permit(:name, :user_name).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:id]) 
  end
end
