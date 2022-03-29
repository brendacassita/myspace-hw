class Api::FriendsController < ApplicationController
  #devise_token_auth here
  # check the token that was sent in request
  # if token is valid it will set this current_user
  # as the logged user making the request
  # if token is invalid send back 401 error
  before_action :authenticate_user!
 
  # return the 'logged in': current_user

  def index
    # grab the 'current_user'(user who sent valid token)
    liked_friends = current_user.liked_friends
    # passing liked_frinds array an array of our array
    render json: User.unliked_friends(liked_friends)
  end

  # gets called when user liks a friend
  def update
    # pushing the id from params to the liked_friends array
    current_user.liked_friends.push(params[:id].to_i)
    # update user to db
    current_user.save
  end
end