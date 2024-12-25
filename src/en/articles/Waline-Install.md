---
cover: /assets/images/Waline-Install-cover.avif
title: Waline Standalone Installation Guide
icon: comment
order: 2
category:
  - Guide
  - Tutorial
  - Network
tag:
  - Linux
  - Git
  - Node.js
  - Debian
---

[Waline](https://waline.js.org) is a lightweight and secure comment system. It is a backend-supported comment system derived from Valine, essentially a Valine with a backend. Waline offers various features such as email notifications, WeChat notifications, comment management, and multi-database support, including LeanCloud, MySQL, MongoDB, SQLite, and PostgreSQL.

However, the official documentation does not provide detailed instructions on how to deploy Waline independently.

This article explains how to deploy Waline on [Debian 12](https://www.debian.org) using the source code method.

## Notes

All commands in this article assume you are running with `root` privileges. If you are not using `root`, prepend `sudo` to the commands as needed.

Deploying the standalone `waline` server requires the following:

- A cloud server and a configured database (e.g., PostgreSQL). For other databases, refer to [Multi-Database Guide](https://waline.js.org/guide/server/databases.html).

- Node.js environment installation and configuration. The project depends on Node.js, so ensure the environment is pre-installed.

## Preparing the Environment

- Install Debian 12
- Install NPM
- Install PostgreSQL

```bash
apt install npm postgresql
```

## Installation Steps

- Create a directory to store the Waline program

Create the directory:

```bash
mkdir -p /opt/waline
```

- Install Waline

```bash
cd /opt/waline
npm install @waline/vercel
```

## Configure Permissions

- Create a `waline` user and assign permissions

Create a user named `waline` and set a strong password:

```bash
adduser waline
chown -R waline:waline /opt/waline
```

## Database Configuration

- Create a Waline database

```bash
su - postgres
psql
CREATE USER waline;
CREATE DATABASE waline;
grant all privileges on database waline to waline;
alter database waline owner to waline;
exit; # Exit psql
exit # Exit postgres user
```

- Import database tables

Download [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) and copy its content.

Run the import:

```bash
su - waline
psql
\c waline
# Paste the content of waline.pgsql here and press Enter to execute
# You should see outputs like:
# CREATE SEQUENCE
# CREATE TABLE
# CREATE SEQUENCE
# CREATE TABLE
# CREATE SEQUENCE
# CREATE TABLE
exit; # Exit psql
exit # Exit waline user
```

## Service Configuration

- Create a systemd service

```bash
nano /usr/lib/systemd/system/waline.service
```

Paste the following content:

```ini
[Unit]
Description=waline
After=network.target

[Service]
User=waline
Type=simple
WorkingDirectory=/opt/waline
ExecStart=/usr/bin/node /opt/waline/node_modules/@waline/vercel/vanilla.js
Environment="PG_HOST=/var/run/postgresql"
Environment="PG_PORT=5432"
Environment="PG_DB=waline"
Environment="PG_USER=waline"
Environment="PG_PREFIX=wl_"
Environment="SITE_NAME=MengGuyi's blog" # Replace with your site name
Environment="SITE_URL=https://blog.mengguyi.com" # Replace with your site URL
Environment="SECURE_DOMAINS=blog.mengguyi.com" # Replace with your domain
Environment="JWT_TOKEN=XGfqCGrfP6pkQDJW" # Generate your JWT token
Environment="AUTHOR_EMAIL=i@mengguyi.com" # Your email address
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Starting Waline

Use systemctl to start the service:

```bash
systemctl start waline.service
```

At this point, you can access Waline by adding an `nginx` reverse proxy for `waline`.

![Success Image](/assets/images/Waline-Install-finish.avif)

## References

[Waline Official Documentation](https://waline.js.org/guide/deploy/vps.html)

[Independent Deployment Solution for Waline Server](https://anyfork.github.io/blog-docs/posts/other/walineServer.html)