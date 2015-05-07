# apache-express
A Node server that runs PHP

If you have forever installed, copy the apache-express.conf file in ```/etc/init```

Execute the command ```sudo start apache-express``` to start the server.

Inside server.js, you can change the views folder to wherever you store your PHP scripts.

You also have a secure sever running using SSL. Change the certificate and key files to make your site secure.

Note: the scripts can't execute JavaScript. This is because the scripts are executed on the command line.
