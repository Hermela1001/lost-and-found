ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

require "bundler/setup" # Set up gems listed in the Gemfile.
require "bootsnap/setup" # Speed up boot time by caching expensive operations.
# config/boot.rb
require 'rubygems'
require 'bundler/setup'
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.

# Workaround for Ruby 3.4.0 frozen array bug
module Bootsnap
  class LoadPathCache
    module Store
      def push(path)
        super(path.dup)
      end
    end
  end
end
