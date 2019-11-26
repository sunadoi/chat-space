require 'rails_helper'

describe Message do
  describe '#' do
    it "is valid with a nickname, email, password, password_confirmation" do
      user = build(:user)
      expect(user).to be_valid
    end
  end
end