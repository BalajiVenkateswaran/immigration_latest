#!/bin/bash -x

echo "<VirtualHost *:80>
   DocumentRoot /var/www/html
   ServerName www.dev-theimmigrationhub.com
   RewriteEngine On
   RewriteCond %{HTTP:X-Forwarded-Proto} =http
   RewriteRule . https://%{HTTP:Host}%{REQUEST_URI} [L,R=permanent]
</VirtualHost>" >> /etc/httpd/conf/httpd.conf
echo 'inside ui run script'
service httpd restart
