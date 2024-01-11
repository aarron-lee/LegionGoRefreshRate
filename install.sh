#!/usr/bin/bash
# does the following:
# - LegionGoRefreshRate Decky Plugin
if [ "$EUID" -eq 0 ]
  then echo "Please do not run as root"
  exit
fi


echo "removing previous install if it exists"

cd $HOME

sudo rm -rf $HOME/homebrew/plugins/LegionGoRefreshRate

echo "installing LegionGoRefreshRate plugin for refresh rate changes"
# download + install simple decky tdp
curl -L $(curl -s https://api.github.com/repos/aarron-lee/LegionGoRefreshRate/releases/latest | grep "browser_download_url" | cut -d '"' -f 4) -o $HOME/LegionGoRefreshRate.tar.gz
sudo tar -xzf LegionGoRefreshRate.tar.gz -C $HOME/homebrew/plugins

# install complete, remove build dir
rm  $HOME/LegionGoRefreshRate.tar.gz
sudo systemctl restart plugin_loader.service

echo "Installation complete"
