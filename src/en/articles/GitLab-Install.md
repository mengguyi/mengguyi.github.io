---
cover: /assets/images/GitLab-Install-cover.avif
title: GitLab EE 16 install and cracking tutorial
icon: fab fa-gitlab
order: 2
category:
  - Guide
  - Tutorial
  - Network
  - Crack
tag:
  - GitLab
  - Linux
  - Git
  - Ruby
  - Golang
  - Debian
---

[GitLab](https://gitlab.com) is an open source application developed mainly in Ruby on Rails language, which implements a self-hosted Git project repository that can be accessed and managed through a web interface. In short, it is a [GitHub](https://github.com) that can be deployed privately.

Gitlab official offers various ways of installation and deployment, such as installing from the operating system software source, deploying with Docker, or compiling and installing from source code.

This article shows you how to compile and install GitLab on [Debian 12](https://www.debian.org) from source code and activate the enterprise edition features.

## Note

All the commands in this article are assumed to be executed under `root` permission. If you are not using `root`, please add `sudo` before the command as appropriate.

All the content related to cracking and activation in this article is for research and learning purposes only. Do not use it for commercial purposes! Please buy the official version if you need it.

It is highly recommended that you compile and install GitLab on a machine that can access Google normally.

## Prepare the environment

- Install Debian 12
~~I don't need to say this, right?~~
- Install GitLab related dependencies

```bash
apt install sudo build-essential zlib1g-dev libyaml-dev libssl-dev libgdbm-dev libre2-dev libreadline-dev libncurses5-dev libffi-dev curl openssh-server libxml2-dev libxslt-dev libcurl4-openssl-dev libicu-dev libkrb5-dev logrotate rsync python3-docutils pkg-config cmake runit-systemd libcurl4-openssl-dev libexpat1-dev gettext libz-dev libssl-dev libpcre2-dev build-essential git-core graphicsmagick postfix libimage-exiftool-perl ruby ruby-dev golang npm postgresql postgresql-client libpq-dev postgresql-contrib redis-server nginx
```

During the installation process, you need to configure `postfix`

![Configure postfix 1](/assets/images/GitLab-Install-1.avif)

Select `Internet Site` and press `Enter` to enter the domain name

![Configure postfix 2](/assets/images/GitLab-Install-2.avif)

Then wait for the installation to complete

![Installation completed](/assets/images/GitLab-Install-3.avif)

After installing the above things, you also need to install `yarn` to compile the GitLab front end.

```bash
npm install --global yarn
```

## Compile Gitaly

clone `Gitaly` repository and compile `Git`

```bash
git clone https://gitlab.com/gitlab-org/gitaly.git /tmp/gitaly
cd /tmp/gitaly
make git GIT_PREFIX=/usr/local
```

![Compile Gitaly](/assets/images/GitLab-Install-4.avif)

Create a `git` user for `GitLab`

```bash
adduser --disabled-login --gecos 'GitLab' git
```

Use the following command to initialize the database for `GitLab`

```bash
sudo -u postgres psql -d template1 -c "CREATE USER git CREATEDB;"
sudo -u postgres psql -d template1 -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;"
sudo -u postgres psql -d template1 -c "CREATE EXTENSION IF NOT EXISTS btree_gist;"
sudo -u postgres psql -d template1 -c "CREATE EXTENSION IF NOT EXISTS plpgsql;"
sudo -u postgres psql -d template1 -c "CREATE DATABASE gitlabhq_production OWNER git;"
```

Configure Redis

se the following command to configure `Redis`

```bash
cp /etc/redis/redis.conf /etc/redis/redis.conf.orig
sed 's/^port .*/port 0/' /etc/redis/redis.conf.orig | sudo tee /etc/redis/redis.conf
echo 'unixsocket /var/run/redis/redis.sock' | sudo tee -a /etc/redis/redis.conf
echo 'unixsocketperm 770' | sudo tee -a /etc/redis/redis.conf
usermod -aG redis git
```

Check the status of `Redis` with the following command

```bash
systemctl show --value --property=Type redis-server.service
```

If output is `notify` then execute

```bash
systemctl restart redis
```

If not, refer to [GitLab official documentation](https://docs.gitlab.com/ee/install/installation.html#supervise-redis-with-systemd)

## Compile GitLab

Create a folder and give `git` user permission

```bash
mkdir /opt/gitlab
chown -R git /opt/gitlab
cd /opt/gitlab
```

### Clone GitLab source code

```bash
sudo -u git -H git clone https://gitlab.com/gitlab-org/gitlab.git gitlab
```

Enter the `GitLab` directory and edit the configuration file
You need to modify the `host` `port` `https` in `config/gitlab.yml`
Replace `localhost` with your domain name, and change the default `git` repository directory to the one you want to use
Modify the UnixSocket file location and the `gitlab_shell` directory location as shown in the figure.
And the `bin_path` of `git`
The relevant pictures are below.

```bash
cd /opt/gitlab/gitlab
sudo -u git -H cp config/gitlab.yml.example config/gitlab.yml
sudo -u git -H editor config/gitlab.yml
```

![First modification](/assets/images/GitLab-Install-5.avif)
![Second modification](/assets/images/GitLab-Install-6.avif)
![Third modification](/assets/images/GitLab-Install-7.avif)
![Fourth modification](/assets/images/GitLab-Install-8.avif)
![Fifth modification](/assets/images/GitLab-Install-9.avif)
![Sixth modification](/assets/images/GitLab-Install-10.avif)

### Configure GitLab

```bash
sudo -u git -H cp config/secrets.yml.example config/secrets.yml
sudo -u git -H chmod 0600 config/secrets.yml
chown -R git log/
chown -R git tmp/
chmod -R u+rwX,go-w log/
chmod -R u+rwX tmp/
chmod -R u+rwX tmp/pids/
chmod -R u+rwX tmp/sockets/
sudo -u git -H mkdir -p public/uploads/
chmod 0700 public/uploads
chmod -R u+rwX builds/
chmod -R u+rwX shared/artifacts/
chmod -R ug+rwX shared/pages/
sudo -u git -H cp config/puma.rb.example config/puma.rb
```

### Configure puma

```bash
sudo -u git -H editor config/puma.rb
sudo -u git -H cp config/resque.yml.example config/resque.yml
sudo -u git -H cp config/cable.yml.example config/cable.yml
```

You need to modify some file directory locations in the configuration file
For details, please see the figure below

![puma modification 1](/assets/images/GitLab-Install-11.avif)
![puma modification 2](/assets/images/GitLab-Install-12.avif)

### Configure Redis
Generally speaking, this does not need to be modified. If you are using the default Debian / Ubuntu configuration file

```bash
sudo -u git -H editor config/resque.yml config/cable.yml
```

### Modify the database configuration file

Remove the `host` `username` `password` lines from `config/database.yml`

```bash
sudo -u git cp config/database.yml.postgresql config/database.yml
sudo -u git -H editor config/database.yml
```

After removing it, it probably looks like this:

```yml
production:
  main:
    adapter: postgresql
    encoding: unicode
    database: gitlabhq_production
  ci:
    adapter: postgresql
    encoding: unicode
    database: gitlabhq_production
    database_tasks: false
  geo:
    adapter: postgresql
    encoding: unicode
    database: gitlabhq_geo_production
``` 

There are also pictures here

![Modify the database configuration file](/assets/images/GitLab-Install-13.avif)

### Install bundler and use bundler to install dependencies

```bash
sudo -u git -H editor config/database.yml
sudo -u git -H chmod o-rwx config/database.yml
gem install bundler
sudo -u git -H bundle config set --local deployment 'true'
sudo -u git -H bundle config set --local without 'development test mysql aws kerberos'
sudo -u git -H bundle config path /opt/gitlab/gitlab/vendor/bundle
sudo -u git -H bundle install
```

### Install GitLab Shell

::: warning
This step requires a network that can access Google
Otherwise golang cannot complete the download
:::

Use `curl` to check the network

```bash
curl -iv https://www.google.com
```

If you see output similar to the picture, it means the network is smooth and you can proceed with this step.

![Network test](/assets/images/GitLab-Install-14.avif)
![Network test](/assets/images/GitLab-Install-15.avif)

Install GitLab Shell
Successful example as shown in the picture

```bash
sudo -u git -H bundle exec rake gitlab:shell:install RAILS_ENV=production
```

![Install GitLab Shell](/assets/images/GitLab-Install-16.avif)

### Edit the GitLab Shell configuration file

Modify the `gitlab_url` inside to your domain name

```bash
sudo -u git -H editor /opt/gitlab/gitlab-shell/config.yml
```

### Install GitLab Enterprise Edition Features

```bash
sudo -u git -H bundle exec rake "gitlab:workhorse:install[/opt/gitlab/gitlab-workhorse]" RAILS_ENV=production
sudo -u git -H bundle exec rake "gitlab:indexer:install[/opt/gitlab/gitlab-elasticsearch-indexer]" RAILS_ENV=production
```

## Install GitLab Pages

```bash
cd /opt/gitlab
sudo -u git -H git clone https://gitlab.com/gitlab-org/gitlab-pages.git
cd gitlab-pages
sudo -u git -H make
```

## Install Gitaly

```bash
cd /opt/gitlab/gitlab
sudo -u git -H bundle exec rake "gitlab:gitaly:install[/opt/gitlab/gitaly,/opt/gitlab/repositories]" RAILS_ENV=production
chmod 0700 /opt/gitlab/gitlab/tmp/sockets/private
chown git /opt/gitlab/gitlab/tmp/sockets/private
```

## Install the service 

```bash
cd /opt/gitlab/gitlab
mkdir -p /usr/local/lib/systemd/system
cp lib/support/systemd/* /usr/local/lib/systemd/system/
```

You need to make some adjustments to the configuration file
Add the following two lines to the `[Unit]` section of the following two files
`Wants=redis-server.service postgresql.service`
`After=redis-server.service postgresql.service`

```bash
nano /usr/local/lib/systemd/system/gitlab-puma.service
nano /usr/local/lib/systemd/system/gitlab-sidekiq.service
```

You also need to edit all the `servise` files in the `/usr/local/lib/systemd/system/` directory and fix the wrong directories.

![Edit configuration file](/assets/images/GitLab-Install-17.avif)

Then execute the following

```bash
systemctl daemon-reload
```

Edit the `Gitaly` configuration file
Change the `path = "/opt/gitlab/repositories"` to `path = "/Data/git/repositories"`

```bash
nano /opt/gitlab/gitaly/config.toml
```

Finally execute it

```bash
systemctl enable gitlab.target
```

## Set up Logrotate

```bash
cp lib/support/logrotate/gitlab /etc/logrotate.d/gitlab
```

## Start Gitaly

```bash
systemctl start gitlab-gitaly.service
```

## Initialize Database and Activate Advanced Features 

```bash
cd /opt/gitlab/gitlab
sudo -u git -H bundle exec rake gitlab:setup RAILS_ENV=production
```

## Check Application Status

```bash
sudo -u git -H bundle exec rake gitlab:env:info RAILS_ENV=production
```

## Compile Assets

```bash
sudo -u git -H yarn install --production --pure-lockfile
sudo -u git -H bundle exec rake gitlab:assets:compile RAILS_ENV=production NODE_ENV=production
```

If `rake` fails with `JavaScript heap out of memory` error, try to run it with `NODE_OPTIONS` set as follows.

```bash
sudo -u git -H bundle exec rake gitlab:assets:compile RAILS_ENV=production NODE_ENV=production NODE_OPTIONS="--max_old_space_size=4096"
```

## GitLab Start!

```bash
systemctl start gitlab.target
```

## Nginx configuration

Edit the `gitlab-ssl` file, edit the unixsocket path, replace `YOUR_SERVER_FQDN` with your domain name, and remove `default_server`. Configure the certificate location
Note that the user running `nginx` must be able to access `GitLab`'s unixsocket, otherwise it will 403.

```bash
cp lib/support/nginx/gitlab-ssl /etc/nginx/sites-available/gitlab-ssl
ln -s /etc/nginx/sites-available/gitlab-ssl /etc/nginx/sites-enabled/gitlab-ssl
nano /etc/nginx/sites-available/gitlab-ssl
```

![Nginx configuration 1](/assets/images/GitLab-Install-18.avif)
![Nginx configuration 2](/assets/images/GitLab-Install-19.avif)
![Nginx configuration 3](/assets/images/GitLab-Install-20.avif)

restart `nginx`

```bash
systemctl restart nginx.service
```

## Double-check Application Status

```bash
sudo -u git -H bundle exec rake gitlab:check RAILS_ENV=production
```

## Initial login

Visit the domain name you set before, and `GitLab` will ask you to set a `root` password

![Initial login](/assets/images/GitLab-Install-21.avif)

After setting the password and logging in, you will see the `GitLab` interface
At this time, `GitLab` is not activated yet, and the language is English

![GitLab interface](/assets/images/GitLab-Install-22.avif)

![GitLab language settings](/assets/images/GitLab-Install-23.avif)

## Activate GitLab

Write the following script into `license.rb` and make appropriate modifications, such as the username and so on.

```ruby
require "openssl"
require "gitlab/license"
key_pair = OpenSSL::PKey::RSA.generate(2048)
File.open("license_key", "w") { |f| f.write(key_pair.to_pem) }
public_key = key_pair.public_key
File.open("license_key.pub", "w") { |f| f.write(public_key.to_pem) }
private_key = OpenSSL::PKey::RSA.new File.read("license_key")
Gitlab::License.encryption_key = private_key
license = Gitlab::License.new
license.licensee = {
"Name" => "none",
"Company" => "none",
"Email" => "example@test.com",
}
license.starts_at = Date.new(2021, 1, 1) # 开始时间
license.expires_at = Date.new(2050, 1, 1) # 结束时间
license.notify_admins_at = Date.new(2049, 12, 1)
license.notify_users_at = Date.new(2049, 12, 1)
license.block_changes_at = Date.new(2050, 1, 1)
license.restrictions = {
active_user_count: 10000,
}
puts "License:"
puts license
data = license.export
puts "Exported license:"
puts data
File.open("GitLabBV.gitlab-license", "w") { |f| f.write(data) }
public_key = OpenSSL::PKey::RSA.new File.read("license_key.pub")
Gitlab::License.encryption_key = public_key
data = File.read("GitLabBV.gitlab-license")
$license = Gitlab::License.import(data)
puts "Imported license:"
puts $license
unless $license
raise "The license is invalid."
end
if $license.restricted?(:active_user_count)
active_user_count = 10000
if active_user_count > $license.restrictions[:active_user_count]
    raise "The active user count exceeds the allowed amount!"
end
end
if $license.notify_admins?
puts "The license is due to expire on #{$license.expires_at}."
end
if $license.notify_users?
puts "The license is due to expire on #{$license.expires_at}."
end
module Gitlab
class GitAccess
    def check(cmd, changes = nil)
    if $license.block_changes?
        return build_status_object(false, "License expired")
    end
    end
end
end
puts "This instance of GitLab Enterprise Edition is licensed to:"
$license.licensee.each do |key, value|
puts "#{key}: #{value}"
end
if $license.expired?
puts "The license expired on #{$license.expires_at}"
elsif $license.will_expire?
puts "The license will expire on #{$license.expires_at}"
else
puts "The license will never expire."
end
```

写入 `license.rb`

```bash
gem install gitlab-license
mkdir gitlab-license
cd gitlab-license
nano license.rb
ruby license.rb
```

Backup the original license
Then overwrite the new license

```bash
cp /opt/gitlab/gitlab/.license_encryption_key.pub /opt/gitlab/gitlab/.license_encryption_key.pub.bak
cp /opt/gitlab/gitlab/gitlab-license/license_key.pub /opt/gitlab/gitlab/.license_encryption_key.pub
```

Modify the activation script
Change line 247 to `restricted_attr(:plan).presence || ULTIMATE_PLAN`

```bash
nano /opt/gitlab/gitlab/ee/app/models/license.rb
```

Restart GitLab

```bash
systemctl restart gitlab.target
```

Visit https://yourGitLabdomain/admin/application_settings/general and click `Add License`, then click `Enter license key`

![Add License](/assets/images/GitLab-Install-24.avif)

Paste the content of `/opt/gitlab/gitlab/gitlab-license/GitLabBV.gitlab-license` and check `Terms of service` and click `Add license`

Activation successful

![Activation successful](/assets/images/GitLab-Install-25.avif)

Enjoy！

## References

[GitLab official documentation](https://docs.gitlab.com/ee/install/installation.html)

[GitLab ARM64源码编译搭建](https://zhuanlan.zhihu.com/p/393131933)

[破解Gitlab EE 15](https://www.pengtech.net/gitlab/gitlab_ee_crack.html)