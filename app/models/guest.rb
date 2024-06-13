class Guest < ApplicationRecord
    validate :full_name_check
    validates :phone_number, presence: true, format: { with: /\A\d{10,11}\z/, message: "must be 10 or 11 digits, numbers only" }
  
    private
  
    def full_name_check
      # Split the full name into words
      names = full_name.split
  
      # Check if there are at least two words
      if names.count < 2
        errors.add(:full_name, "must be your first and last name")
        return  
      end
      #SELF ADDED:
      # Check the name to ensure it only contains alphabetic characters
      names.each do |name|
        unless name.match?(/\A[a-zA-Z]+\z/)
          errors.add(:full_name, "must only contain alphabetic characters")
          break  
        end
      end
    end
  end
  