# -*- encoding: utf-8 -*-
# stub: rack-slashenforce 0.0.2 ruby lib

Gem::Specification.new do |s|
  s.name = "rack-slashenforce"
  s.version = "0.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Tyler Kellen"]
  s.date = "2012-03-10"
  s.description = ""
  s.email = "tyler@sleekcode.net"
  s.homepage = "https://github.com/tkellen/rack-slashenforce/"
  s.rubygems_version = "2.5.1"
  s.summary = "A rack middleware to enforce appending or removing trailing slashes."

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rack>, [">= 0"])
    else
      s.add_dependency(%q<rack>, [">= 0"])
    end
  else
    s.add_dependency(%q<rack>, [">= 0"])
  end
end
