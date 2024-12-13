---
cover: /assets/images/GitLab-Install-cover.avif
title: GitLab EE 17 Docker install and cracking tutorial
icon: download
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
  - Docker
  - Debian
---

This article explains how to use [Docker](https://www.docker.com) to deploy [GitLab](https://gitlab.com)

Using the official GitLab documentation, we can easily install GitLab via Docker.

This article explains how to compile and install GitLab from source on [Debian 12](https://www.debian.org) and activate the Enterprise Edition features.

## Note

All the commands in this article are assumed to be executed under `root` permission. If you are not using `root`, please add `sudo` before the command as appropriate.

All the content related to cracking and activation in this article is for research and learning purposes only. Do not use it for commercial purposes! Please buy the official version if you need it.

It is highly recommended that you compile and install GitLab on a machine that can access Google normally.

## Prepare the environment

- Install Debian 12
~~I don't need to say this, right?~~
- Install Docker

````bash
wget -O- https://raw.githubusercontent.com/docker/docker-install/master/install.sh | sh
````

If you are in mainland China, you can add this line before execution to use a domestic mirror for faster installation.

````bash
export DOWNLOAD_URL="https://mirrors.bfsu.edu.cn/docker-ce"
````

- Change the SSH Port

Since GitLab needs to use port 22, we need to change the SSH port of the server (this is recommended because it avoids the need to specify the port number when cloning repositories via SSH).

Edit `/etc/ssh/sshd_config` and change `Port 22` to `Port 2222`. Save the file and then execute `systemctl restart ssh`.

Verify that you can connect to the server using the new port.

## Start Installation

- Create a folder to store GitLab data

Find a place to store the configuration files, logs, and database. This can be in various locations, such as the user's home directory or the system root directory.

1.Create the directory

````bash
mkdir -p /opt/gitlab
````

If you are running Docker as a user other than root, grant the user appropriate permissions for the directory.

2.Configure a new environment variable $GITLAB_HOME to match the path of the directory you created.

````bash
export GITLAB_HOME=/opt/gitlab
````

Alternatively, you can append the `GITLAB_HOME` environment variable to the shell's configuration file so that it applies to all future terminal sessions.

For bash, its configuration file is `~/.bash_profile`, and for zsh, it is `~/.zshrc`.

The mapping relationship between the GitLab container data folder and the host folder:

|    Local location	    | Container location  |     Usage     |
| --------------------- | --------------- | ----------------- |
| `$GITLAB_HOME/data`   | /var/opt/gitlab | Stores application data. |
| `$GITLAB_HOME/logs`   | /var/log/gitlab | Stores logs.      |
| `$GITLAB_HOME/config` | /etc/gitlab     | Stores the GitLab configuration files |

- Create a Docker Compose file

Create a `docker-compose.yml` file, for example:

````yaml
version: '3.6'
services:
  gitlab:
    image: gitlab/gitlab-ee
    container_name: gitlab
    restart: always
    hostname: 'gitlab.example.com'
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        # Write other gitlab.rb configurations here, and remember to change the default external_url
        external_url 'https://gitlab.example.com'
    ports:
      - '80:80'
      - '443:443'
      - '22:22'
    volumes:
      - '$GITLAB_HOME/config:/etc/gitlab'
      - '$GITLAB_HOME/logs:/var/log/gitlab'
      - '$GITLAB_HOME/data:/var/opt/gitlab'
    shm_size: '256m'
````

Then execute 

````bash
docker compose up -d
````

Alternatively, you can use Docker Engine to run GitLab, but both methods are the same. This will not be elaborated further here.

Execute

````bash
docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
````

to obtain the root password generated during installation.

After that, visit the `external_url` you set to access GitLab!

![Installation complete](/assets/images/GitLab-Install-Docker-1.avif)

Enter the username root and the root password you obtained, then click login to access GitLab.

## Cracking GitLab

- Use GitLab-License-Generator to generate a license

Since GitLab-License-Generator has been taken down by a DMCA notice, we need to run it manually:

````bash
apt install ruby-full
gem install bundler
gem install gitlab-license
git clone https://github.com/Lakr233/GitLab-License-Generator.git
cd GitLab-License-Generator
````

Then edit `src/scan.features.rb` and paste the following content:

````ruby
#!/usr/bin/env ruby
# encoding: utf-8

require 'json'
require 'optparse'

OptionParser.new do |opts|
    opts.banner = "Usage: scan.features.rb [options]"

    opts.on("-s", "--src-dir PATH", "Specify gitlab source dir (required if --features-file is ommited)") do |v|
        GITLAB_FEATURES_FILE="#{File.expand_path(v)}/ee/app/models/gitlab_subscriptions/features.rb"
    end

    opts.on("-f", "--features-file PATH", "Specify gitlab features path (required if --src-dir is ommited)") do |v|
        GITLAB_FEATURES_FILE = File.expand_path(v)
    end

    opts.on("-o", "--output PATH", "Output to json file (required)") do |v|
        EXPORT_JSON_FILE = File.expand_path(v)
    end

    opts.on("-h", "--help", "Prints this help") do
        puts opts
        exit
    end
end
.parse!
if GITLAB_FEATURES_FILE.nil? || EXPORT_JSON_FILE.nil?
    puts "[!] missing required options"
    puts "[!] use -h for help"
    exit 1
end
puts "Reading features from #{GITLAB_FEATURES_FILE}"

def ignore_exception
    begin
      yield
    rescue Exception
    end
end

puts "[*] loading features.rb..."
ignore_exception do
    require_relative "#{GITLAB_FEATURES_FILE}"
end

ALL_FEATURES = []
GitlabSubscriptions::Features.constants.each do |const_name|
    puts "[*] gathering features from #{const_name}"
    if const_name.to_s.include? 'FEATURE'
        ALL_FEATURES.concat(GitlabSubscriptions::Features.const_get(const_name))
    else
        puts "[?] unrecognized constant #{const_name}"
    end
end

ALL_FEATURES.uniq!
ALL_FEATURES.sort_by! { |feature| feature }

puts "[*] total features: #{ALL_FEATURES.size}"

puts "[*] writing to #{EXPORT_JSON_FILE}"
File.write(EXPORT_JSON_FILE, JSON.pretty_generate(ALL_FEATURES))

puts "[*] done"
````

Generate the license (modify the LICENSE variable as needed):

````bash
chmod +x src/scan.features.rb
LICENSE_NAME="Tim Cook"
LICENSE_COMPANY="Apple Computer, Inc."
LICENSE_EMAIL="tcook@apple.com"
LICENSE_PLAN="ultimate"
LICENSE_USER_COUNT="2147483647"
LICENSE_EXPIRE_YEAR="2500"
./make.sh
````

The generated license is in the `build` folder.

The files to use are `public.key` and `result.gitlab-license`.

We need to replace GitLab's `.license_encryption_key.pub` with the generated `public.key`.

````bash
docker exec -it gitlab bash
rm /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub

# After executing the following line, paste the contents of public.key and press Enter to write the contents into .license_encryption_key.pub. Press Control + C to exit.
cat > /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub

gitlab-ctl reconfigure
gitlab-ctl restart
````

Paste the contents of `result.gitlab-license` into 

https://yourGitLabDomain/admin/application_settings/general Click Add License, select Enter license key, and paste the contents from `result.gitlab-license`.

Accept the TOS and click Add license.

At this point, GitLab will be successfully activated!

![activated](/assets/images/GitLab-Install-Docker-cover.avif)

## References

[GitLab Docs](https://docs.gitlab.com/ee/install/installation.html)

[GitLab-License-Generator](https://github.com/Lakr233/GitLab-License-Generator)