module Api
  module V1
    class GuestsController < ApplicationController
      skip_before_action :verify_authenticity_token
      def create
        @guest = Guest.new(guest_params)
        if @guest.save
          render json: { message: "Guest created successfully", guest: @guest }, status: :created
        else
          render json: { errors: @guest.errors }, status: :bad_request
        end
      end
      private
      def guest_params
        params.require(:guest).permit(:full_name, :phone_number)
      end
    end
  end
end
